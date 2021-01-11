import Phaser from 'phaser';
import ScrollingBackground from './background';
import Button from '../objects/Button';

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#f7b924',
      align: 'center',
    });

    this.title.setOrigin(0.5);
    this.input = document.getElementById('userName');
    this.playerName = this.input.value;
    this.add.text(this.game.config.width * 0.2, 180, this.playerName, {
      fontFamily: 'monospace',
      fontSize: 32,
      fontStyle: 'bold',
      color: '#f7b924',
      align: 'center',
    });

    this.add.text(this.game.config.width * 0.7, 180, this.score, {
      fontFamily: 'monospace',
      fontSize: 32,
      fontStyle: 'bold',
      color: '#f7b924',
      align: 'center',
    });

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    const GAME_ID = '1Wz7xAsh8x7xog2n1GNz';
    const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
    const postScore = () => {
      fetch(`${BASE_URL}/games/${GAME_ID}/scores/`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: this.playerName,
          score: this.score,
        }),
      });
    };
    postScore();

    // this.playButton = new Button(
    //   this,
    //   300,
    //   350,
    //   "blue_button1",
    //   "blue_button2",
    //   "PLAY AGAIN",
    //   "SceneMain"
    // );

    this.btnScores = new Button(
      this,
      300,
      450,
      'blue_button1',
      'blue_button2',
      'SCORES',
      'LeaderBoardScene',
    );

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}
