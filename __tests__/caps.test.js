'use strict';

// const events = require('../events');
const logger = require('../apps/logger');
const faker = require('faker');

describe('caps console logs', () => { 
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  
  let order = { 
    storeName: 'Ye Ol\' Russian Books', 
    orderId: faker.random.uuid(),
    customerName: faker.name.findName(),
    address: `${faker.address.streetAddress(true)}, ${faker.address.city()}, ${faker.address.state()}` 
  }
    
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it ('logs the connection', () => {
    logger( { order } );
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


