import Phaser from "phaser";
import ScrollingBackground from "./background";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }
  preload() {
    this.load.image('sprBg0', sprBg0);
    this.load.image('sprBg1', sprBg1);
  }

  create() {
    // this.title = this.add.text(
    //     this.game.config.width * 0.5,
    //     128,
    //     'Enter your name:',
    //     {
    //       fontFamily: 'monospace',
    //       fontSize: 48,
    //       fontStyle: 'bold',
    //       color: '#F7B924',
    //       align: 'center',
    //     },
    //   );
    //   this.scene.start('SceneMain');
    console.log('start scenestart');
  }
  update() {

  }
}
