import Phaser from 'phaser';
import ScrollingBackground from './background';
import Button from '../objects/Button';
import sprBg0 from '../assets/sprBg0.png';
import sprBg1 from '../assets/sprBg1.png';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.image('sprBg0', sprBg0);
    this.load.image('sprBg1', sprBg1);
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
        color: '#1fa7e1',
        align: 'center',
      },
    );
    this.title1.setOrigin(0.5);

    this.nameInput = document.getElementById('userName');
    this.nameInput.style.visibility = 'visible';

    this.playButton = new Button(this, 290, 400, 'blue_button1', 'blue_button2', 'PLAY', 'SceneMain');

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }
}
