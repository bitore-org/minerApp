import "./style.scss";
import * as bootstrap from "bootstrap";

import storage from "./system/storage/storage";
import { InitRouter } from "./components/router";
import { SettingsModal } from "./modals/settings";

import wallet from "./system/wallet/wallet";
import appState from "./system/state";
import events from "./system/eventEmmiter";
import { WalletModal } from "./modals/walletCreate";

import Worker from "./worker/worker.ts?worker";

window.onload = async () => {
  storage.set("loaded", true);

  const bootstrapLoad = bootstrap;

  bootstrapLoad.Button;

  const settingsModal = new SettingsModal();

  settingsModal;

  if (!wallet.getWallet()) {
    const walletModal = new WalletModal(wallet.createWallet);
    walletModal.show();
  }

  InitRouter();

  appState;

  let hashRate: number[] = [];
  let minerState: boolean[] = [];

  setInterval(() => {
    const state = appState.getState();

    if (state.miningInprogress) {
      const challengeNumber = state.currentEpoch.challengeNumber;
      const miningTarget = state.currentEpoch.miningTarget;
      const address = wallet.getWallet();
      const epochCount = state.currentEpoch.epochCount;
      const multiplier = state.difficultyMultiplier;

      if (address) {
        for (let index = 0; index < 2; index++) {
          if (state.currentEpoch.endBlockNumber > state.latestBlock.number) {
            if (
              state.currentNonce.epochCount === state.currentEpoch.epochCount
            ) {
              continue;
            }
          }

          if (minerState[index]) {
            continue;
          }

          // Create a new worker
          const worker = new Worker();

          minerState[index] = true;
          // Send a message to the worker
          worker.postMessage({
            challengeNumber,
            miningTarget: miningTarget.toString(),
            address,
            multiplier,
          });

          // Listen for messages from the worker
          worker.onmessage = (event: MessageEvent) => {
            hashRate[index] = event.data.hashRate;

            minerState[index] = false;

            if (event.data.nonce) {
              events.emit("newNonce", event.data.nonce, epochCount);
            }
          };
        }
      }
    }
  }, 3000);

  setInterval(() => {
    const state = appState.getState();

    if (state.miningInprogress) {
      const sumHashRate = hashRate.reduce((a, b) => a + b, 0);

      if (sumHashRate > 0) {
        events.emit("sumHashRate", sumHashRate);
      }
    }
  }, 3000);
};
