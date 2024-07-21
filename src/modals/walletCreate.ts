import * as bootstrap from "bootstrap";

export class WalletModal {
  modalDom: bootstrap.Modal;
  acceptTermsCheckbox: HTMLInputElement;
  generateWalletButton: HTMLButtonElement;
  saveCallback: () => Promise<any>;

  constructor(callback: () => Promise<any>) {
    this.saveCallback = callback;

    this.modalDom = new bootstrap.Modal(
      document.getElementById("walletModal") as any
    );
    this.acceptTermsCheckbox = document.getElementById(
      "acceptTerms"
    ) as HTMLInputElement;
    this.generateWalletButton = document.getElementById(
      "generateWallet"
    ) as HTMLButtonElement;

    // Enable/disable the Generate New Wallet button based on checkbox state
    this.acceptTermsCheckbox.addEventListener("change", () => {
      this.generateWalletButton.disabled = !this.acceptTermsCheckbox.checked;
    });

    // Handle wallet generation
    this.generateWalletButton.addEventListener("click", async () => {
      // Add your wallet generation logic here
      console.log("Generating new wallet...");

      try {
        await this.saveAndClose();
      } catch (error) {
        console.error("Error generating wallet:", error);
      }
    });
  }

  public show() {
    // Show the wallet modal on page load
    this.modalDom.show();
  }

  public async saveAndClose() {
    await this.saveCallback();

    // After wallet is generated, you can close the modal:
    this.modalDom.hide();
  }
}
