'use strict';

// const events = require("../../events");

const io = require('socket.io-client');
const capsVendor = io.connect('http://localhost:3000/caps-namespace');
// const capsVendor = io.connect(`${host}/caps-namespace`);
console.log('Connected to the caps namespace.')

// (1) Monitor the system for events. 
capsVendor.on('pickup', confirmation);

// (2) On the ‘pickup’ event, wait 1 second, then log “DRIVER: picked up [ORDER_ID]” to the console.
function confirmation(payload){
  setTimeout(() => {
    console.log(`DRIVER: Picked up order No.: ${payload.orderId}.`)

    // (3) Emit an ‘in-transit’ event with the payload you received.
    capsVendor.emit('in-transit', payload);
  }, 1500);
    
  // (4) Wait 3 seconds, then log “delivered” to the console.
  setTimeout(() => {
    console.log(`DRIVER: Delivered order No. ${payload.orderId}`);
    // (5) Emit a ‘delivered’ event with the same payload.
    capsVendor.emit('delivered', payload);
  }, 3000);
};

module.exports = confirmation;
