import { template } from "./home.template";
import { MiningUI } from "./miningCanvas";

import appState from "../../../system/state";
import events from "../../../system/eventEmmiter";
import wallet from "../../../system/wallet/wallet";
import { BASE_MULTIPLIER } from "../../../worker/miner/miner";

// register controller in chart.js and ensure the defaults are set

const getCountDown = () => {
  const state = appState.getState();

  const blockLeft = state.blockLeft;

  if (!blockLeft && blockLeft != 0) {
    return undefined;
  }

  if (blockLeft < 0) {
    return -1;
  }

  if (state.timeLeft < 0) {
    return state.timeLeft;
  }

  return state.timeLeft;
};

export const HomePage = async () => {
  (document.getElementById("App") as any).innerHTML = template();

  (document.getElementById("walletAddress") as any).innerHTML =
    wallet.getWallet();

  // Start Mining Button

  const startMiningBtn = document.getElementById("startMiningBtn");
  const stopMiningBtn = document.getElementById("stopMiningBtn");

  if (startMiningBtn && stopMiningBtn) {
    startMiningBtn.addEventListener("click", () => {
      startMiningBtn.style.display = "none";
      stopMiningBtn.style.display = "";

      events.emit("StartMining");
    });

    stopMiningBtn.addEventListener("click", () => {
      stopMiningBtn.style.display = "none";
      startMiningBtn.style.display = "";

      events.emit("StopMining");
    });

    // Initially hide the stop button
    stopMiningBtn.style.display = "none";
  }

  const minerCanvas = new MiningUI("epochDraw");

  function updateCountdown() {
    minerCanvas.draw(getCountDown());

    const state = appState.getState();

    const tokenBalance = document.getElementById("tokenBalance");
    const walletBalance = document.getElementById("walletBalance");
    const miningMultiplier = document.getElementById("miningMultiplier");
    const tokenTotalSupply = document.getElementById("tokenTotalSupply");

    if (tokenBalance && walletBalance && miningMultiplier && tokenTotalSupply) {
      walletBalance.innerHTML = `${(
        Number(state.walletBalance) /
        10 ** 18
      ).toFixed(8)} ETH`;

      miningMultiplier.innerHTML = `${
        (Number(
          (10000n * BigInt(state.difficultyMultiplier)) / BASE_MULTIPLIER
        ) /
          10000) *
        100
      }%`;
    }

    minerCanvas.updateValues(
      Number(state.currentEpoch.epochCount),
      state.hashRate,
      Number(state.currentEpoch.allowedMiners),
      Number(state.currentEpoch.minerCount),
      Number(state.latestBlock.number) || 99999999
    );
  }

  minerCanvas.draw(getCountDown());

  setInterval(updateCountdown, 300);
};
