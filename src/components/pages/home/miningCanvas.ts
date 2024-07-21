const BLAST_YELLOW = "#fcfc03";

export class MiningUI {
  private static readonly BLAST_YELLOW = "#fcfc03";
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private totalSegments = 30;
  private totalCells = 100;
  private ratio = 3 / 1;
  private gridCols: number;
  private gridRows: number;
  private grid: string[][];
  private gap = 2;
  private epoch: number = 1;
  private hashRate: number = 100;
  private countdown?: number;
  private filledCells: number = 0;
  private latestBlock: number = 999_999;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.gridCols = Math.ceil(Math.sqrt(this.totalCells * this.ratio));
    this.gridRows = Math.ceil(this.totalCells / this.gridCols);

    this.grid = Array(this.gridRows)
      .fill(null)
      .map(() => Array(this.gridCols).fill("#3b3b3b"));

    window.addEventListener("resize", this.resizeCanvas.bind(this));
    this.resizeCanvas();
  }

  public updateValues(
    epoch: number,
    hashRate: number,
    totalCells: number,
    filledCells: number,
    latestBlock: number
  ) {
    this.epoch = epoch;
    this.hashRate = hashRate;
    this.totalCells = totalCells;
    this.filledCells = filledCells;
    this.latestBlock = latestBlock;
  }

  private resizeCanvas() {
    this.draw(this.countdown);
  }

  public setGridColor(row: number, col: number, color: string) {
    if (row >= 0 && row < this.gridRows && col >= 0 && col < this.gridCols) {
      this.grid[row][col] = color;
    }
  }

  public fillGridPattern(color: string, fillCount: number): void {
    let filledCells = 0;

    for (let row = 0; row < this.gridRows; row++) {
      for (let col = 0; col < this.gridCols; col++) {
        if (filledCells < fillCount) {
          this.setGridColor(row, col, color);
          filledCells++;
        } else {
          break; // Stop filling this row once we've reached fillCount
        }
      }
      if (filledCells >= fillCount) {
        break; // Stop filling rows once we've filled the required number of cells
      }
    }
  }

  private fixSquare() {
    const currentCells = this.gridCols * this.gridRows;

    if (currentCells > this.totalCells) {
      const diff = currentCells - this.totalCells;

      for (let i = 0; i < diff; i++) {
        this.setGridColor(this.gridRows - 1, this.gridCols - 1 - i, "black");
      }
    }
  }

  private drawTextBoxes() {
    this.ctx.fillStyle = "black";
    this.ctx.font = "25px Clock";

    let hashRateText = `${(this.hashRate / 1000).toFixed(1)} KH/s`;
    if (this.hashRate >= 1_000_000) {
      hashRateText = `${(this.hashRate / 1_000_000).toFixed(2)} MH/s`;
    }

    const epochText = `Epoch ${this.epoch}`;

    const hashRateTextWidth = this.ctx.measureText(hashRateText).width;

    const epochTextWidth = this.ctx.measureText(epochText).width;

    this.ctx.fillStyle = MiningUI.BLAST_YELLOW;
    this.ctx.fillRect(10, 10, epochTextWidth + 20, 40);
    this.ctx.fillRect(
      this.canvas.width - hashRateTextWidth - 30,
      10,
      hashRateTextWidth + 20,
      40
    );

    this.ctx.fillStyle = "black";

    this.ctx.fillText(epochText, 20, 40);

    this.ctx.fillText(
      hashRateText,
      this.canvas.width - hashRateTextWidth - 20,
      40
    );
  }

  private drawStatusAndLatestBlock() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "25px Clock";

    const text = `Latest block: ${this.latestBlock}`;

    const textSize = this.ctx.measureText(text);

    this.ctx.fillText(text, this.canvas.width / 2 - textSize.width / 2, 305);
  }

  private drawCountdown(countdown: number | string) {
    const radius = 100;
    const thickness = 20;
    const x = this.canvas.width / 2;
    const y = 160;
    const segmentAngle = (2 * Math.PI) / this.totalSegments;

    this.ctx.strokeStyle = MiningUI.BLAST_YELLOW;
    this.ctx.lineWidth = thickness;

    if (typeof countdown === "string") {
      this.ctx.fillStyle = "white";
      this.ctx.font = "80px Clock";
      this.ctx.fillText(countdown.toString(), x - 95, y + 30);

      return;
    }

    if (countdown < 0) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "50px Clock";
      this.ctx.fillText("Waiting", x - 75, y + 20);
      this.ctx.fillText("for new Epoch", x - 155, y + 70);

      return;
    }

    for (let i = 0; i < countdown / 2; i++) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, i * segmentAngle, (i + 1) * segmentAngle);
      this.ctx.stroke();
    }

    this.ctx.fillStyle = "white";
    this.ctx.font = "80px Clock";
    this.ctx.fillText(countdown.toString(), x - 33, y + 30);
  }

  private drawGrid() {
    const maxCellSize = Math.min(
      25,
      (this.canvas.width - (this.gridCols - 1) * this.gap) / this.gridCols,
      (this.canvas.height - 200 - (this.gridRows - 1) * this.gap) /
        this.gridRows
    );

    const offsetX =
      (this.canvas.width -
        (maxCellSize * this.gridCols + this.gap * (this.gridCols - 1))) /
      2;
    const offsetY = 320;

    for (let i = 0; i < this.gridRows; i++) {
      for (let j = 0; j < this.gridCols; j++) {
        this.ctx.fillStyle = this.grid[i][j];
        this.ctx.fillRect(
          offsetX + j * (maxCellSize + this.gap),
          offsetY + i * (maxCellSize + this.gap),
          maxCellSize,
          maxCellSize
        );
      }
    }

    this.fixSquare();
  }

  public draw(countdown?: number) {
    this.countdown = countdown;

    const maxCellSize = Math.min(
      25,
      (this.canvas.width - (this.gridCols - 1) * this.gap) / this.gridCols,
      (this.canvas.height - 200 - (this.gridRows - 1) * this.gap) /
        this.gridRows
    );

    this.canvas.width = window.innerWidth * 0.8;
    this.canvas.height = 330 + this.gridRows * (maxCellSize + this.gap);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawTextBoxes();
    if (countdown !== undefined) {
      this.drawCountdown(countdown);
    } else {
      this.drawCountdown("Loading");
    }

    this.drawGrid();

    this.fillGridPattern(BLAST_YELLOW, this.filledCells);

    this.drawStatusAndLatestBlock();
  }
}
