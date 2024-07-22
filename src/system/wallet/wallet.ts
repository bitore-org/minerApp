import {
  createWalletClient,
  http,
  parseEther,
  createPublicClient,
  PrivateKeyAccount,
  encodeFunctionData,
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { liskSepolia, mainnet } from "viem/chains";

import state from "../state";
import events from "../eventEmmiter";

import storage from "../storage/storage";
import { abi } from "../abis/bitOreABI";

export class WalletModule {
  private walletClient: any;

  private account!: PrivateKeyAccount;
  private static instance: WalletModule;
  publicClient: any;

  private inTransaction: boolean = false;

  constructor() {
    if (!storage.get<string>("rpcUrl")) {
      storage.set("rpcUrl", "https://rpc.sepolia-api.lisk.com");
    }

    const rpcUrl = storage.get<string>("rpcUrl")!;

    const privateKey = storage.get<`0x${string}`>("privateKey");
    if (privateKey) {
      this.account = privateKeyToAccount(privateKey);
    }

    this.publicClient = createPublicClient({
      chain: liskSepolia,
      transport: http(rpcUrl),
    });
    this.walletClient = createWalletClient({
      chain: liskSepolia,
      transport: http(rpcUrl),
    });

    events.on("submitNonce", async (nonce: string) => {
      try {
        await this.sendMiningNonce(nonce);

        events.emit("nonceSubmitted", nonce);
      } catch (error: any) {
        if (error.name === "TransactionExecutionError") {
          // The error object might have a 'cause' property with more details
          const reason = error.cause?.reason || error.message;
          console.log("Transaction failed. Reason:", reason);
        } else {
          console.log("An unexpected error occurred:", error);
        }
      }
    });
  }

  public static getInstance(): WalletModule {
    if (!WalletModule.instance) {
      WalletModule.instance = new WalletModule();
    }

    return WalletModule.instance;
  }

  getWallet() {
    if (!this.account) {
      return null;
    }
    return this.account.address;
  }

  async createWallet() {
    const privateKey = generatePrivateKey();

    storage.set<`0x${string}`>("privateKey", privateKey);

    this.account = privateKeyToAccount(privateKey);
    return this.account.address;
  }

  async getBalance() {
    if (!this.account) {
      throw new Error("Wallet not created");
    }
    return this.publicClient.getBalance({ address: this.account.address });
  }

  async revealPrivateKey() {
    if (!this.account) {
      throw new Error("Wallet not created");
    }

    const privateKey = storage.get<`0x${string}`>("privateKey");
    return privateKey;
  }

  async sendMiningNonce(nonce: string) {
    if (!this.account) {
      throw new Error("Wallet not created");
    }

    if (this.inTransaction) {
      return;
    }

    this.inTransaction = true;

    try {
      const appState = state.getState();

      const canMine = await this.publicClient.readContract({
        address: appState.contractAddress,
        abi: abi,
        functionName: "canMine",
        args: [this.account.address],
      });

      if (!canMine) {
        // Already minted
        return;
      }

      const data = encodeFunctionData({
        abi: abi,
        functionName: "mine",
        args: [nonce, [appState.tokenAddress]],
      });

      const hash = await this.walletClient.sendTransaction({
        account: this.account,
        to: appState.contractAddress,
        value: 0n,
        data: data,
        gasLimit: 3_00_000n,
      });

      const transactionLog =
        storage.get<Record<string, any>[]>("transactionLog") || [];

      transactionLog.push({ hash: hash, status: "unknown" });

      storage.set<Record<string, any>[]>("transactionLog", transactionLog);

      return hash;
    } catch (error) {
      throw error;
    } finally {
      this.inTransaction = false;
    }
  }

  async sendTransaction(to: string, value: bigint) {
    if (!this.account) {
      throw new Error("Wallet not created");
    }
    const transaction = await this.walletClient.sendTransaction({
      account: this.account,
      to,
      value: parseEther(value.toString()),
    });
    return transaction;
  }

  async getLatestBlock() {
    return this.publicClient.getBlock({ blockTag: "latest" });
  }

  changeRPC(newRpcUrl: string) {
    this.publicClient = createPublicClient({
      chain: mainnet,
      transport: http(newRpcUrl),
    });
    this.walletClient = createWalletClient({
      chain: mainnet,
      transport: http(newRpcUrl),
    });
  }

  async trackTransactionByHash(txHash: string) {
    return this.publicClient.waitForTransactionReceipt({ hash: txHash });
  }

  public getPublicClient() {
    return this.publicClient;
  }
}

export default WalletModule.getInstance();
