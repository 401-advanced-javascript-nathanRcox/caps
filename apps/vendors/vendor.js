'use strict';

require('dotenv').config();
// const events = require('../events');
const io = require('socket.io-client');
const faker = require('faker');

const host = 'http://localhost:3001';
const brainConnection = io.connect(host);
const capsVendor = io.connect(`${host}/caps-namespace`);
console.log('Connected to the caps namespace.')

// (1) Declare your store name (perhaps in a dotenv file, so that this module is re-usable).
const store = process.env.STORE;

capsVendor.emit('join', store);

setInterval(() => {
  let order = { 
    storeName: store, 
    orderId: faker.random.uuid(),
    customerName: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.state()}` 
  }
  capsVendor.emit('pickup', order); // Emits to caps.
}, 5000); 

// capsVendor.on('in-transit-message', intransitHandler);

// function intransitHandler(payload) {
//   console.log(`${payload.orderId} is on its way.`);
// }

// (6) Whenever the ‘delivered’ event occurs, log “thank you” to the console.
const thankYou = (payload) => {
  console.log(`VENDOR: Thank you for delivering order No. ${payload.orderId}.`)
};

// (5) Monitor the system for events:
capsVendor.on('delivered-message', thankYou);

module.exports = thankYou;
