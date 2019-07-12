// This fixture matches the transitions we are expecting to get back from transforming the
// SampleGrid fixture to the UpdatedGrid fixture
export default function createUpdateTransitions() {
  return [
    { block: { x: 2, y: 2, colour: 'blue' }, action: 'remove' },
    { block: { x: 2, y: 3, colour: 'blue' }, action: 'remove' },
    { block: { x: 3, y: 3, colour: 'blue' }, action: 'remove' },
    { block: { x: 4, y: 3, colour: 'blue' }, action: 'remove' },
    { block: { x: 4, y: 4, colour: 'blue' }, action: 'remove' },
    { block: { x: 4, y: 2, colour: 'blue' }, action: 'remove' },
    { block: { x: 4, y: 1, colour: 'red' }, action: 'drop', length: 3 },
    { block: { x: 4, y: 0, colour: 'green' }, action: 'drop', length: 3 },
    { block: { x: 3, y: 2, colour: 'green' }, action: 'drop', length: 1 },
    { block: { x: 3, y: 1, colour: 'yellow' }, action: 'drop', length: 1 },
    { block: { x: 3, y: 0, colour: 'red' }, action: 'drop', length: 1 },
    { block: { x: 2, y: 1, colour: 'green' }, action: 'drop', length: 2 },
    { block: { x: 2, y: 0, colour: 'yellow' }, action: 'drop', length: 2 },
  ];
}
