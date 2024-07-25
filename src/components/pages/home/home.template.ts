import { html } from "../../../html";

export const template = () => {
  return html`<div class="container mt-4">
      <div class="row text-center">
        <h4 style="color: aliceblue;" id="walletAddress">
          Loading Wallet...
        </h4>
      </div>
    </div>

    <div class="container mt-4">
      <div class="card" id="pixiCanvas">

      </div>
    </div>

    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-6 text-center">
          <button id="startMiningBtn" class="btn btn-lg btn-primary btn-block">
            <i class="fas fa-hammer me-2"></i> Start Mining!
          </button>

          <button id="stopMiningBtn" class="btn btn-lg btn-danger btn-block">
            <i class="fas fa-stop-circle me-2"></i> Stop Mining!
          </button>


        </div>
      </div>
    </div>

    <div class="container mt-4">
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-header">Your balance:</div>
            <div id="tokenBalance" class="card-body">0.0 PoW</div>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-header">Wallet:</div>
            <div id="walletBalance" class="card-body">Loading balance...</div>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-header">Mining multiplier:</div>
            <div id="miningMultiplier" class="card-body">100%</div>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3">
          <div class="card">
            <div class="card-header">Total Supply:</div>
            <div id="tokenTotalSupply" class="card-body">0.0 PoW</div>
          </div>
        </div>
      </div>
    </div>


  </div>`;
};
