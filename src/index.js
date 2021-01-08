/* eslint-disable no-use-before-define */

import Phaser from 'phaser';
import './style.css';
import SceneMainMenu from './scenes/SceneMainMenu';
import StartScene from './scenes/StartScene';
import SceneMain from './scenes/SceneMain';
import SceneGameOver from './scenes/SceneGameOver';
import LeaderBoardScene from './scenes/LeaderBoardScene';

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [SceneMainMenu, StartScene, SceneMain, SceneGameOver, LeaderBoardScene],
  pixelArt: true,
  roundPixels: true,
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
export default game;
