import Entity from '../objects/Entities';
import CarrierShip from '../objects/CarrierShip';

test('CarrierShip should be a subclass of Entity', () => {
  expect(CarrierShip).toBeSubclassOf(Entity);
});