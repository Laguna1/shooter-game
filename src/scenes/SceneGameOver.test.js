import Phaser from 'phaser';
import SceneGameOver from './SceneGameOver';

describe('SceneGameOver scene', () => {
  const scene = new SceneGameOver();

  test('It has create method', () => {
    expect(typeof scene.create).toBe('function');
  });

  test('It has update method', () => {
    expect(typeof scene.update).toBe('function');
  });

  test('SceneGameOver should be a subclass of Phaser.Scene', () => {
    expect(SceneGameOver).toBeSubclassOf(Phaser.Scene);
  });
});
