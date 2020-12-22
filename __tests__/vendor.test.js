'use strict';

const events = require('../events');
const vendors = require('../modules/vendor');

describe('vendor handlers', () => {
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('logs a thank-you after the order is delivered', () => {
    events.emit('delivered-message', { orderId: 1 });
    expect(consoleSpy).toHaveBeenCalled();
  });
});

