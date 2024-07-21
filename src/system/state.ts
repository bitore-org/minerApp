import wallet from "../system/wallet/wallet";
import { BASE_MULTIPLIER } from "../worker/miner/miner";
import { abi } from "./abis/bitOreABI";

import events from "./eventEmmiter";

const DefaultAppState = {
  currentEpoch: {
    epochCount: 0,
    minerCount: 0,
    allowedMiners: 100,
    startBlockNumber: 0,
    endBlockNumber: 0,
    endTimestamp: 0,
    miningTarget: 0n,
    challengeNumber: 0n,
    reachedAdjustDifficulty: false,
  },

  latestBlock: {},
  initBlock: {},

  contractAddress: "0x4aEeA272eec411D3CA596F3F7C623584D1B37Ce4",

  difficultyMultiplier: BASE_MULTIPLIER,
  hashRate: 0,
  walletBalance: 0,
  currentNonce: { epochCount: 0n, nonce: null, isSubmitted: false },
  blockTimeSec: 2,
  miningInprogress: false,
  sumHashRate: 0,
};

class AppState {
  private static instance: AppState;
  state: Record<string, any>;
  publicClient: any;

  private constructor() {
    this.state = DefaultAppState;
    this.publicClient = wallet.getPublicClient();

    setInterval(async () => {
      await this.updateState();

      console.log(this.getState());
    }, 1500);

    setInterval(async () => {
      await this.updateWallet();
    }, 2500);

    // Add listeners

    events.on("StartMining", () => {
      this.state.miningInprogress = true;
    });

    events.on("StopMining", () => {
      this.state.miningInprogress = false;

      this.state.hashRate = 0;
    });

    events.on("sumHashRate", (sumHashRate: number) => {
      this.state.hashRate = sumHashRate;
    });

    events.on("newNonce", (nonce: string, epochCount: BigInt) => {
      if (epochCount > this.state.currentNonce.epochCount) {
        this.state.currentNonce = { nonce, epochCount, isSubmitted: false };
        events.emit("submitNonce", nonce);
      }

      if (
        this.state.currentEpoch.endBlockNumber < this.state.latestBlock.number
      ) {
        events.emit("submitNonce", nonce);
      }
    });

    events.on("nonceSubmitted", (nonce: string) => {
      if (nonce === this.state.currentNonce.nonce) {
        this.state.currentNonce.isSubmitted = true;
      }
    });
  }

  public getState(): Record<string, any> {
    const currentTimeSec = Math.floor(Date.now() / 1000);

    if (this.state.initBlock.number !== this.state.latestBlock.number) {
      this.state.blockTimeSec = Number(
        (this.state.latestBlock.timestamp - this.state.initBlock.timestamp) /
          (this.state.latestBlock.number - this.state.initBlock.number)
      );
    }

    const blockLeft =
      this.state.currentEpoch.endBlockNumber - this.state.latestBlock.number;

    const expectedEndTime =
      Number(
        this.state.currentEpoch.endBlockNumber - this.state.latestBlock.number
      ) * 2;

    const timeLeft =
      expectedEndTime +
      Number(this.state.latestBlock.timestamp) -
      currentTimeSec;

    return { ...this.state, currentTimeSec, blockLeft, timeLeft };
  }

  private async updateWallet() {
    const balance = await wallet.getBalance();

    this.state.walletBalance = balance;

    const result = await this.publicClient.readContract({
      address: this.state.contractAddress,
      abi: abi,
      functionName: "getDifficultyMultiplier",
      args: [wallet.getWallet()],
    });

    this.state.difficultyMultiplier = result;
  }

  private async updateState() {
    const result = await this.publicClient.readContract({
      address: this.state.contractAddress,
      abi: abi,
      functionName: "getEpochInfo",
      args: [],
    });

    this.state.currentEpoch = result;

    const latestBlock = await this.publicClient.getBlock();

    if (
      !this.state?.latestBlock?.number ||
      latestBlock.number > this.state?.latestBlock?.number
    ) {
      this.state.latestBlock = latestBlock;
    }

    if (
      !this.state?.initBlock?.number ||
      BigInt(latestBlock.number) % 1000n === 0n
    ) {
      this.state.initBlock = latestBlock;
    }
  }

  public static getInstance(): AppState {
    if (!AppState.instance) {
      AppState.instance = new AppState();
    }

    return AppState.instance;
  }
}

export default AppState.getInstance();
