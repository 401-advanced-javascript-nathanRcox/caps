'use strict';

// const events = require("../../events");

const io = require('socket.io-client');
const caps = io.connect('http://localhost:3000/caps-namespace');
// const caps = io.connect(`${host}/caps-namespace`);
console.log('Connected to the caps namespace.')

// (1) Monitor the system for events. 
caps.on('pickup', confirmation);

function confirmation(payload){
  setTimeout(() => {
    // console.log('DRIVER PAYLOAD:', payload)
    console.log(`DRIVER: Picked up order No.: ${payload.payload.orderId}.`)

    // (3) Emit an ‘in-transit’ event with the payload you received.
    caps.emit('in-transit', payload);
  }, 1500);
    
  // (4) Wait 3 seconds, then log “delivered” to the console.
  setTimeout(() => {
    console.log(`DRIVER: Delivered order No. ${payload.payload.orderId}`);
    // (5) Emit a ‘delivered’ event with the same payload.
    caps.emit('delivered', payload);
  }, 3000);
};

module.exports = confirmation;
