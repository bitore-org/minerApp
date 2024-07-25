import { Application, Assets, Sprite } from "pixi.js";
import { TextBox } from "./parts/textBox";

export class MiningUI {
  app: Application;
  loaded: boolean;
  constructor() {
    this.app = new Application();

    this.loaded = false;
  }

  async load(canvasId: string) {
    // Initialize the application
    await this.app.init({ background: "#1099bb", resizeTo: window });

    document.getElementById(canvasId)?.appendChild(this.app.canvas);

    const hashText = new TextBox("Hashrate: 0.0 H/s");

    this.app.stage.addChild(hashText.self);

    // Listen for animate update
    this.app.ticker.add((time) => {
      // Just for fun, let's rotate mr rabbit a little.
      // * Delta is 1 if running at 100% performance *
      // * Creates frame-independent transformation *
    });

    window.addEventListener("resize", () => {
      console.log(this.app.stage);

      hashText.self.x = this.app.screen.width / 2;
      hashText.self.y = this.app.screen.height / 2;
    });
  }
}
