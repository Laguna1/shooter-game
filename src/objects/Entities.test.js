import Phaser from 'phaser';
import Entity from './Entities';

test('Button should be a subclass of Phaser.GameObjects.Sprite ', () => {
  expect(Entity).toBeSubclassOf(Phaser.GameObjects.Sprite);
});
