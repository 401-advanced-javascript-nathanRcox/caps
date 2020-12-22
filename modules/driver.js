'use strict';

const events = require("../events");

// (2) On the ‘pickup’ event, wait 1 second, then log “DRIVER: picked up [ORDER_ID]” to the console.
const confirmation = (payload) => {
  setTimeout(() => {
    console.log(`Driver: picked up order No.: ${payload.orderId}.`)
    // (3) Emit an ‘in-transit’ event with the payload you received.

    events.emit('in-transit', payload);
  }, 1000);
    
  // (4) Wait 3 seconds, then log “delivered” to the console.
  setTimeout(() => {
    console.log(`DRIVER: Delivered order No. ${payload.orderId}`);

    // (5) Emit a ‘delivered’ event with the same payload.
    events.emit('delivered', payload);
  }, 3000);
};

// (1) Monitor the system for events. 
events.on('pickup', confirmation);

module.exports = { confirmation };
