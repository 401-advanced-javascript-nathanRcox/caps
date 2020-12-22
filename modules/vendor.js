'use strict';

require('dotenv').config();
const events = require("../events");

const faker = require('faker');

// (1) Declare your store name (perhaps in a dotenv file, so that this module is re-usable).
const STORE = process.env.STORE;

// (3) Create a fake order as an object: storeName, orderId, customerName, address.
// (2) Every 5 seconds, simulate a new customer order.
// (4) Emit a 'order-recieved' event and attach the fake order as a payload. HINT: Have some fun by using the faker library to make up phony information
setInterval(() => {
  let order = { 
    storeName: STORE, 
    orderId: `${faker.random.uuid()}`, 
    customerName: `${faker.name.findName()}`, 
    address: `${faker.address.city()}, ${faker.address.state()}` 
  }
  events.emit('order-received', order); // Emits to caps.
}, 5000); 

// (6) Whenever the ‘delivered’ event occurs, log “thank you” to the console.
const thankYou = (payload) => {
  console.log(`VENDOR: Thank you for delivering order No. ${payload.orderId}.`)
};

// (5) Monitor the system for events:
events.on('delivered-message', thankYou);


module.exports = setInterval;
