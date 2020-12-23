'use strict';

// const events = require('../events');
const caps = require('../caps');

describe('caps console logs', () => { 
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it ('logs the connection', () => {
    caps.on('connection', (socket) => {
      expect(consoleSpy).toHaveBeenCalled();
    })
  })

  // it ('logs the payload after order-received', () => {
  //   caps.on( { orderId: 1 });
  //   expect(consoleSpy).toHaveBeenCalled();
  // });

  // it ('logs the payload after in-transit', () => {
  //   events.emit('in-transit', { orderId: 1 });
  //   expect(consoleSpy).toHaveBeenCalled();
  // });

  // it ('logs the payload after delivered', () => {
  //   events.emit('delivered', { orderId: 1 });
  //   expect(consoleSpy).toHaveBeenCalled();
  // });


})