/* eslint-disable no-use-before-define */

import Phaser from "phaser";
import "./style.css";
import SceneMainMenu from "./scenes/SceneMainMenu";
import StartScene from "./scenes/StartScene";
import SceneMain from "./scenes/SceneMain";
import SceneGameOver from "./scenes/SceneGameOver";

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [SceneMainMenu, StartScene, SceneMain, SceneGameOver],
  pixelArt: true,
  roundPixels: true,
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
