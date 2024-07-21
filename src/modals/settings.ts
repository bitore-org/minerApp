import storage from "../system/storage/storage";

export class SettingsModal {
  modalDom: HTMLElement | null;
  constructor() {
    this.modalDom = document.getElementById("settingsModal");

    const openButton = document.getElementById("settingsButton");

    const saveCloseButton = document.getElementById(
      "settingsModal-saveAndClose"
    );

    if (saveCloseButton) {
      saveCloseButton.addEventListener("click", this.saveAndClose);
    }

    if (openButton) {
      openButton.addEventListener("click", this.openModal);
    }
  }

  private openModal() {
    const privateKey = document.getElementById(
      "privateKey"
    ) as HTMLInputElement;

    const customRPC = document.getElementById("customRPC") as HTMLInputElement;

    const customGas = document.getElementById("customGas") as HTMLInputElement;

    if (privateKey) {
      privateKey.value = "****************";
    }

    const revealPrivateKey = document.getElementById("revealPrivateKey");

    if (revealPrivateKey && privateKey) {
      revealPrivateKey.addEventListener("click", () => {
        if (privateKey) {
          const privateKeyValue = storage.get<`0x${string}`>("privateKey");

          privateKey.value = privateKeyValue as string;
        }
      });
    }

    if (customRPC) {
      const rpcUrl = storage.get<string>("rpcUrl")!;

      customRPC.value = rpcUrl;
    }
    if (customGas) {
      customGas.value = "0";

      const customGasValue = storage.get<string>("customGas");

      if (customGasValue) {
        customGas.value = customGasValue;
      }
    }
  }

  private saveAndClose() {
    const customRPC = document.getElementById("customRPC") as HTMLInputElement;

    const customGas = document.getElementById("customGas") as HTMLInputElement;

    if (customRPC?.value) {
      storage.set<string>("rpcUrl", customRPC.value);
    }

    if (customGas?.value) {
      storage.set<string>("customGas", customGas.value);
    }

    console.log("Modal save and close");
  }
}
