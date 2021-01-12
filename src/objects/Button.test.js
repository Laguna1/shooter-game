import Phaser from 'phaser';
import Button from './Button';

test('Button should be a subclass of Phaser.GameObjects.Container ', () => {
  expect(Button).toBeSubclassOf(Phaser.GameObjects.Container);
});
