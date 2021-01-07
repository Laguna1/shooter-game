import Phaser from 'phaser';
import ScrollingBackground from './background';
import sprBg0 from '../assets/sprBg0.png';
import sprBg1 from '../assets/sprBg1.png';
import submitBtn from '../assets/sprBtnPlay.png';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.image('sprBg0', sprBg0);
    this.load.image('sprBg1', sprBg1);
    this.load.image('submitBtn', submitBtn);
  }

  create() {
    this.title1 = this.add.text(
      this.game.config.width * 0.5,
      128,
      'Enter your name:',
      {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#F7B924',
        align: 'center',
      },
    );
    this.title1.setOrigin(0.5);
    // btn
    this.input = document.getElementById('userName');
    this.input.style.display = 'block';
    this.submitBtn = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'submitBtn',
    );
    this.submitBtn.setInteractive();

    this.submitBtn.on(
      'pointerup',
      () => {
        this.input.style.display = 'none';
        this.scene.start('SceneMain');
      },
      this,
    );

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }

    // this.scene.start('SceneMain');
    // console.log('start scenestart');
  }

  // update() {

  // }
}
