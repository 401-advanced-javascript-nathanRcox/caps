'use strict';

// const events = require('./events'); used when this was running on TCP and node events.
// require('./apps/drivers/driver');
// require('./apps/vendors/vendor');

require('dotenv').config();
const port = process.env.PORT;

// Start a socket.io server on a designated port.
const io = require('socket.io')(port);

// Namespaces
const caps = io.of('/caps-namespace');

// Turn the socket.io server on.
io.on('connection', (socket) => {
  console.log('You are connected to the SERVER', socket.id);
  });

caps.on('connection', (socket) => {
  console.log('You are connected to the CAPS namespace', socket.id);

  // socket.on('join', room => { // Allows other pages to spin up before moving on.
  //   console.log('Joining room #: ', room);
  //   socket.join(room);
  // })
    // Listen for the vendor socket 'order-received' and emit 'pickup' to the driver.
  socket.on('pickup', (payload) => {
    caps.emit('pickup', payload);
    console.log('EVENT', { event: 'pickup', time: new Date().toString(), payload });
  });

    // Listen for the driver socket 'in-transit'.
  socket.on('in-transit', (payload) => {
    // caps.to(payload.storeName).emit('in-transit-message', payload);
    console.log('EVENT', { event: 'in-transit', time: new Date().toString(), payload });
  });

  // Listen for the driver socket 'delivered' and emit 'delivered-message' to the vendor.
  socket.on('delivered', (payload) => {
    caps.emit('delivered-message', payload);
    console.log('EVENT', { event: 'delivered', time: new Date().toString(), payload });
    console.log('/////////////////////End Transaction///////////////////');
  });
})


module.exports = caps;

///// Lab 11's intro to TCP using node.js events.////

// events.on('order-received', (payload) => {
//   events.emit('pickup', payload);
//   console.log('EVENT', { event: 'pickup', time: new Date().toString(), payload });
// });

// events.on('in-transit', (payload) => {
//   console.log('EVENT', { event: 'in-transit', time: new Date().toString(), payload });
// });

// events.on('delivered', (payload) => {
//   events.emit('delivered-message', payload);
//   console.log('EVENT', { event: 'delivered', time: new Date().toString(), payload });
//   console.log('/////////////////////End Transaction///////////////////');
// });

///////////Refactoring per class 12 code review//////////

// events.on('pickup', (payload) => logEvent('pickup', payload));
// events.on('in-transit', (payload) => logEvent('in-transit', payload));
// events.on('delivered', (payload) => logEvent('delivered', payload));

// function logEvent(event, payload) {
//   const time = new Date().toString();
//   console.log('EVENT', { event, time, payload });
// }
