import { template } from "./home.template";

import wallet from "../../../system/wallet/wallet";
import { MiningUI } from "../../gui/miningUi";

export const HomePage = async () => {
  (document.getElementById("App") as any).innerHTML = template();

  (document.getElementById("walletAddress") as any).innerHTML =
    wallet.getWallet();

  // Usage
  const miningUI = new MiningUI();

  miningUI.load("pixiCanvas").catch(console.log);
};
