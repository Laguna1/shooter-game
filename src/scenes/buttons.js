export class Button extends Phaser.Scene {
    create() {
      const helloButton = this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
      helloButton.setInteractive();
  
      helloButton.on('pointerover', () => { console.log('pointerover'); });
    }
  }