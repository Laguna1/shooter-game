import Phaser from 'phaser';
import StartScene from './StartScene';

test('StartScene should be a subclass of Phaser.Scene', () => {
  expect(StartScene).toBeSubclassOf(Phaser.Scene);
});