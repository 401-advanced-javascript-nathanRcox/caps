'use strict';

const events = require('../events');
const drivers = require('../modules/driver');
const caps = require('../caps');

// global.console = {
//   log: jest.fn(),
//   info: jest.fn(),
//   error: jest.fn()
// }

describe('driver handlers', () => {
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  // it('logs that the driver picked up the order', () => {
  //   events.emit('pickup', { orderId: 1 });
  //   expect(global.console.log).toHaveBeenCalledWith('Driver: picked up order No.: 1.')
  // });
});

