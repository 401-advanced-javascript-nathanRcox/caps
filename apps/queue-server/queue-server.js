// 'use strict';

// require('dotenv').config();
// const port = process.env.PORT  || 3000;

// // Start a socket.io server on a designated port.
// const io = require('socket.io')(port);

// // Namespaces
// const caps = io.of('/caps-namespace');
// const uuid = require('uuid').v4;

// const logEvent = require('./apps/logger');

// const queue = {
//   messages: {}
// };

// // Turn the socket.io server on.
// io.on('connection', (socket) => {
//   console.log('You are connected to the SERVER', socket.id);
//   });

// caps.on('connection', (socket) => {
//     socket.on('new message', payload => {
//       console.log('Heard a NEW MESSAGE in the queue server.', payload);
  
//       const id = uuid();
//       queue.messages[id] = payload;
//       socket.emit('A message was added to the queue.');
//       caps.emit();
  
//     })
//   })


//   // Meant for direct messaging with the vendor/store.
//   socket.on('join', room => { 
//     console.log('Joining room #: ', room);
//     socket.join(room);
//   })
//     // Listen for the vendor socket 'order-received' and emit 'pickup' to the driver.
//   socket.on('pickup', (payload) => { 
//     logEvent('pickup', payload);
//     caps.emit('pickup', payload);
//   });

//     // Listen for the driver socket 'in-transit'.
//   socket.on('in-transit', (payload) => {
//     logEvent('in-transit', payload);
//     caps.to(payload.storeName).emit('in-transit', payload);
//   });

//   // Listen for the driver socket 'delivered' and emit 'delivered-message' to the vendor.
//   socket.on('delivered', (payload) => {
//     logEvent('delivered', payload);
//     caps.to(payload.storeName).emit('delivered-message', payload);
//     console.log('/////////////////////End Transaction///////////////////');
//   });
// })
