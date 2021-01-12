import Phaser from 'phaser';
import LeaderBoardScene from './LeaderBoardScene';

test('LeaderBoardScene should be a subclass of Phaser.Scene', () => {
  expect(LeaderBoardScene).toBeSubclassOf(Phaser.Scene);
});
