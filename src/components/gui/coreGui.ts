import { Application, Assets, Container, Sprite } from "pixi.js";

// Create a new application
const app = new Application();

export const startGui = async () => {
  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.body.appendChild(app.canvas);

  document.getElementById("pixiCanvas")?.appendChild(app.canvas);

  // Manifest example
  const manifestExample = {
    bundles: [
      {
        name: "loadingScreen",
        assets: [
          {
            alias: "loadingScreen",
            src: "https://pixijs.com/assets/flowerTop.png",
          },
        ],
      },
      {
        name: "miningScreen",
        assets: [
          {
            alias: "eggHead",
            src: "https://pixijs.com/assets/eggHead.png",
          },
        ],
      },
    ],
  };

  await Assets.init({ manifest: manifestExample });

  // Bundles can be loaded in the background too!
  Assets.backgroundLoadBundle(["loadingScreen", "miningScreen"]);

  makeLoadScreen();
};

const makeLoadScreen = async () => {
  // Get the assets from the load screen bundle.
  // If the bundle was already downloaded the promise resolves instantly!
  const loadScreenAssets = await Assets.loadBundle("loadingScreen");

  // Create a new Sprite from the resolved loaded texture
  const goNext = new Sprite(loadScreenAssets.loadingScreen);

  goNext.anchor.set(0.5);
  goNext.x = app.screen.width / 2;
  goNext.y = app.screen.height / 2;
  app.stage.addChild(goNext);

  goNext.eventMode = "static";
  goNext.cursor = "pointer";

  goNext.on("pointertap", async () => {
    goNext.destroy();
    makeGameScreen();
  });
};

const makeGameScreen = async () => {
  // Wait here until you get the assets
  // If the user spends enough time in the load screen by the time they reach the game screen
  // the assets are completely loaded and the promise resolves instantly!
  const loadScreenAssets = await Assets.loadBundle("miningScreen");

  // Create a new Sprite from the resolved loaded texture
  const goBack = new Sprite(loadScreenAssets.eggHead);

  goBack.anchor.set(0.5);
  goBack.x = app.screen.width / 2;
  goBack.y = app.screen.height / 2;
  app.stage.addChild(goBack);

  goBack.eventMode = "static";
  goBack.cursor = "pointer";
};
