import Phaser from 'phaser';
import ScrollingBackground from './background';
// import Button from './buttons';
import sprBg0 from '../assets/sprBg0.png';
import sprBg1 from '../assets/sprBg1.png';
import submitBtn from '../assets/sprBtnPlay.png';
import blueBtn from '../assets/blue_button02.png';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.image('sprBg0', sprBg0);
    this.load.image('sprBg1', sprBg1);
    this.load.image('submitBtn', submitBtn);
    this.load.image('blueBtn', blueBtn);
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
        color: '#f7b924',
        align: 'center',
      },
    );
    this.title1.setOrigin(0.5);

    
    this.input = document.getElementById('userName');
    this.input.style.visibility = 'visible';
    // btn
    this.submitBtn = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.4,
      'submitBtn',
    );
    this.submitBtn.setInteractive();

    this.submitBtn.on(
      'pointerup',
      () => {
        this.input.style.visibility = 'hidden';
        this.scene.start('SceneMain');
      },
      this,
    );
  // btn-end
    this.button1 = this.add.text(240, 570, 'Submit2', { fill: '#0f0' });
    this.button1.setInteractive();

    this.button1.on('pointerover', () => { console.log('pointerover'); 
    },
    this,
    );


const startButton = this.add.dynamicBitmapText(
  this.sys.canvas.width / 2,
  this.sys.canvas.height / 2,
  'joystix', 'Игра', 20).setOrigin(0.5);
  this.startButton.setInteractive(); // Разрешаем кнопке реагировать на нажатия и другие события
  this.startButton.on(Phaser.Input.Events.POINTER_DOWN, (event) => {
  alert("Игра начинается...")
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
  }
}
