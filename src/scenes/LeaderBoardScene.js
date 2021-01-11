import Phaser from 'phaser';
import ScrollingBackground from './background';
import sortThenSlice from '../helpers/SortThenSlice';
import sprBg0 from '../assets/sprBg0.png';
import sprBg1 from '../assets/sprBg1.png';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LeaderBoardScene' });
  }

  preload() {
    this.load.image('sprBg0', sprBg0);
    this.load.image('sprBg1', sprBg1);
  }

  create() {
    this.title2 = this.add.text(
      this.game.config.width * 0.5,
      128,
      'LEADER BOARD',
      {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#1faae1',
        align: 'center',
      },
    );
    this.title2.setOrigin(0.5);

    const GAME_ID = '1Wz7xAsh8x7xog2n1GNz';
    const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

    const getCurrentScores = () => {
      fetch(`${BASE_URL}/games/${GAME_ID}/scores/`, {
        mode: 'cors',
      })
        .then((response) => response.json())
        .then((response) => {
          const scoresList = document.getElementById('scores');

          sortThenSlice(response.result).forEach((obj) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${obj.user}: </span> ${obj.score}`;
            scoresList.appendChild(listItem);
            console.log(response);
          });
        });
    };
    getCurrentScores();

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }
}
