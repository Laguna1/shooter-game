import Phaser from 'phaser';
import ScrollingBackground from './background';
import Player from '../objects/Player';
import GunShip from '../objects/Gunship';
import CarrierShip from '../objects/CarrierShip';
import ChaserShip from '../objects/ChaserShip';

import sprExplosion from '../assets/sprExplosion.png';
import sprEnemy0 from '../assets/sprEnemy0.png';
import sprEnemy1 from '../assets/sprEnemy1.png';
import sprEnemy2 from '../assets/sprEnemy2.png';
import sprLaserEnemy0 from '../assets/sprLaserEnemy0.png';
import sprLaserPlayer from '../assets/sprLaserPlayer.png';
import sprPlayer from '../assets/sprPlayer12.png';
import sprBg0 from '../assets/sprBg0.png';
import sprBg1 from '../assets/sprBg1.png';
import sndExplode0 from '../assets/sndExplode0.wav';
import sndExplode1 from '../assets/sndExplode1.wav';
import sndLaser from '../assets/sndLaser.wav';

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' });
    this.score = 0;
    this.scoreText = undefined;
  }

  preload() {
    this.load.image('sprBg0', sprBg0);
    this.load.image('sprBg1', sprBg1);
    this.load.spritesheet('sprExplosion', sprExplosion, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprEnemy0', sprEnemy0, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprEnemy1', sprEnemy1);
    this.load.spritesheet('sprEnemy2', sprEnemy2, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprLaserEnemy0', sprLaserEnemy0);
    this.load.image('sprLaserPlayer', sprLaserPlayer);
    this.load.image('sprPlayer', sprPlayer);

    this.load.audio('sndExplode0', sndExplode0);
    this.load.audio('sndExplode1', sndExplode1);
    this.load.audio('sndLaser', sndLaser);
  }

  create() {
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#f7b924',
    });

    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
    );
    this.player.setScale(0.15);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0,
            );
          }
        } else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(
      this.playerLasers,
      this.enemies,
      (playerLaser, enemy) => {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          this.setScore();
          enemy.explode(true);
          playerLaser.destroy();
        }
      },
    );

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        player.setScale(2);
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead') && !laser.getData('isDead')) {
        player.setScale(2);
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  setScore() {
    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  update() {
    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.cursors.up.isDown) {
        this.player.moveUp();
      } else if (this.cursors.down.isDown) {
        this.player.moveDown();
      }
      if (this.cursors.left.isDown) {
        this.player.moveLeft();
      } else if (this.cursors.right.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData(
          'timerShootTick',
          this.player.getData('timerShootDelay') - 1,
        );
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (
        enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (
        laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (
        laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}
