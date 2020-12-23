'use strict';

// const events = require('../events');
const drivers = require('../apps/drivers/driver');
// const caps = require('../caps');

describe('driver handlers', () => {
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('logs that the driver picked up the order', () => {
    drivers( { orderId: 1 });
    setTimeout(() => { expect(consoleSpy).toHaveBeenCalled(); }, 1500);
  });

  it('logs that the driver delivered the order', () => {
    drivers( { orderID: 1 });
    setTimeout(() => { expect(consoleSpy).toHaveBeenCalled(); }, 3000)
  })
});

