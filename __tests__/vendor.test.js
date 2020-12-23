'use strict';

// const events = require('../events');
// const caps = require('../caps');
const vendor = require('../apps/vendors/vendor');
// const port = process.env.PORT;

// const io = require('socket.io')(port);


describe('vendor handlers', () => {
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('logs a thank-you after the order is delivered', () => {
    vendor( { orderId: 1 } );
    expect(consoleSpy).toHaveBeenCalled();
  });
});

