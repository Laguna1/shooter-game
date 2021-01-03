import Phaser from 'phaser';

export default class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }

  preload() {
    this.load.image('sprBg0', 'assets/sprBg0.png');
    this.load.image('sprBg1', '..src/assets/sprBg1.png');
    this.load.image('sprBtnPlay', '..src/assets/sprBtnPlay.png');
    this.load.image('sprBtnPlayHover', '..src/assets/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', '..src/assets/sprBtnPlayDown.png');
    this.load.image('sprBtnRestart', '..src/assets/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', '..src/assets/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', '..src/assets/sprBtnRestartDown.png');

    this.load.audio('sndBtnOver', '..src/assets/sndBtnOver.wav');
    this.load.audio('sndBtnDown', '..src/assets/sndBtnDown.wav');
  }

  create() {
    this.scene.start('SceneMain');
  }
}