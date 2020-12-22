'use strict';

const events = require('../events');
const drivers = require('../modules/driver');
const caps = require('../caps');

describe('driver handlers', () => {
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('logs that the driver picked up the order', () => {
    events.emit('pickup', { orderId: 1 });
    setTimeout(() => { expect(consoleSpy).toHaveBeenCalled(); }, 1000);
  });

  it('logs that the driver delivered the order', () => {
    events.emit('pickup', { orderID: 1 });
    setTimeout(() => { expect(consoleSpy).toHaveBeenCalled(); }, 3000)
  })
});

