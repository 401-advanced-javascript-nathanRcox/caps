'use strict';

require('dotenv').config();
// const events = require('../events');
const io = require('socket.io-client');
const faker = require('faker');

const capsVendor = io.connect('http://localhost:3000/caps-namespace');
// const capsVendor = io.connect(`${host}/caps-namespace`);
// const capsVendor = io.connect('https://localhost:3000/caps-namespace');

console.log('Connected to the caps namespace.')

// (1) Declare your store name (perhaps in a dotenv file, so that this module is re-usable).
const store = process.env.STORE;

capsVendor.emit('join', store);

setInterval(() => {
  let order = { 
    storeName: store, 
    orderId: faker.random.uuid(),
    customerName: faker.name.findName(),
    address: `${faker.address.streetAddress(true)}, ${faker.address.city()}, ${faker.address.state()}` 
  }
  capsVendor.emit('pickup', order); // Emits to caps.
}, 5000); 

// to join a room in a namespace: emit 'join' with the name of the room.
capsVendor.emit('join', store);

capsVendor.on('in-transit', (payload) => {
  console.log(`DRIVER to VENDOR: Order No. ${payload.orderId} is now in transit.`)
})

// (6) Whenever the ‘delivered’ event occurs, log “thank you” to the console.
const thankYou = (payload) => {
  console.log(`VENDOR: Thank you for delivering order No. ${payload.orderId}.`)
};

// (5) Monitor the system for events:
capsVendor.on('delivered-message', thankYou);

module.exports = thankYou;
