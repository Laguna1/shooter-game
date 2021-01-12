import Entity from './Entities';
import Player from './Player';

test('Player should be a subclass of Entity', () => {
  expect(Player).toBeSubclassOf(Entity);
});
