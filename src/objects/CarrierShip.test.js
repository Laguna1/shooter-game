import Entity from './Entities';
import CarrierShip from './CarrierShip';

test('CarrierShip should be a subclass of Entity', () => {
  expect(CarrierShip).toBeSubclassOf(Entity);
});