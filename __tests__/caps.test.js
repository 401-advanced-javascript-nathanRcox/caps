'use strict';

const events = require('../events');
const caps = require('../caps');

describe('caps console logs', () => { 
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it ('logs the payload after order-received', () => {
    events.emit('order-received', { orderId: 1 });
    expect(consoleSpy).toHaveBeenCalled();
  });

  it ('logs the payload after in-transit', () => {
    events.emit('in-transit', { orderId: 1 });
    expect(consoleSpy).toHaveBeenCalled();
  });

  it ('logs the payload after delivered', () => {
    events.emit('delivered', { orderId: 1 });
    expect(consoleSpy).toHaveBeenCalled();
  });


})