'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const faker = require('faker');

const caps = io.connect('http://localhost:3000/caps-namespace');

console.log('Connected to the caps namespace.')

// (1) Declare your store name (perhaps in a dotenv file, so that this module is re-usable).
const store = process.env.STORE || 'Ye Ol\' Russian Books';

// to join a room in a namespace: emit 'join' with the name of the room.
caps.emit('join', store);

setInterval(() => {
  let order = { 
    storeName: store,
    orderId: faker.random.uuid(),
    customerName: faker.name.findName(),
    address: `${faker.address.streetAddress(true)}, ${faker.address.city()}, ${faker.address.state()}` 
  }
  caps.emit('pickup', order); // Emits to caps.
}, 5000); 


caps.on('in-transit', (payload) => {
  console.log(`DRIVER to VENDOR: Order No. ${payload.payload.orderId} is now in transit.`)
})

// (6) Whenever the ‘delivered’ event occurs, log “thank you” to the console.
const thankYou = (payload) => {
  caps.emit('received', payload);
  console.log(`VENDOR: Thank you for delivering order No. ${payload.payload.orderId}.`)
};

// (5) Monitor the system for events:
caps.on('delivered-message', thankYou);

module.exports = thankYou;
