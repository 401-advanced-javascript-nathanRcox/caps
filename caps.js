'use strict';

require('dotenv').config();
const port = process.env.PORT  || 3000;

// Start a socket.io server on a designated port.
const io = require('socket.io')(port);

// Namespaces
const caps = io.of('/caps-namespace');
const uuid = require('uuid').v4;

const logEvent = require('./apps/logger');

const queue = {
  messages: {}
};

// Turn the socket.io server on.
io.on('connection', (socket) => {
  console.log('You are connected to the SERVER', socket.id);
  });

caps.on('connection', (socket) => {
  
  // Meant for direct messaging with the vendor/store.
  socket.on('join', room => { 
    console.log('Joining room #: ', room);
    socket.join(room);
  })

  socket.on('pickup', payload => {
    logEvent('pickup', payload);
    const messageId = uuid();
    queue.messages[messageId] = payload; // This is throwing an error; don't understand what it's supposed to be doing
    socket.emit('added');
    caps.emit('pickup', { messageId, payload });
  });

  socket.on('in-transit', payload => {
    logEvent('in-transit', payload);
    // const messageId = uuid();
    // queue.messages[messageId] = payload;
    // socket.emit('added');
    caps.to(payload.payload.storeName).emit('in-transit', payload);
    // console.log('Payload.storeName:', payload.payload.storeName);
  });

  // The payload of the 'received' handler should include the client id, event name, and message id, so that you can delete it from the queue.
  socket.on('received', payload => {
    console.log('Heard RECEIVED in the SERVER QUEUE', payload);
    // console.log('Queue.messages:', queue.messages);
    delete queue.messages;
  });

  // The payload should include the client id and event name. 
  socket.on('get-all', () => {
    console.log('Listening to GET-ALL in the QUEUE SERVER');

    Object.keys(queue.messages).forEach(id => {
      socket.emit('message', { id, payload: queue.messages[id]});
    });
  });

  socket.on('delivered', payload => {
    logEvent('delivered', payload);
    caps.to(payload.payload.storeName).emit('delivered-message', payload);
    console.log('/////////////////////End Transaction///////////////////');
  })

    // Listen for the vendor socket 'order-received' and emit 'pickup' to the driver.
  // socket.on('pickup', (payload) => { 
  //   logEvent('pickup', payload);
  //   caps.emit('pickup', payload);
  // });

    // Listen for the driver socket 'in-transit'.
  // socket.on('in-transit', (payload) => {
  //   logEvent('in-transit', payload);
  //   caps.to(payload.storeName).emit('in-transit', payload);
  // });

  // Listen for the driver socket 'delivered' and emit 'delivered-message' to the vendor.
  // socket.on('delivered', (payload) => {
    // logEvent('delivered', payload);
    // caps.to(payload.storeName).emit('delivered-message', payload);
    // console.log('/////////////////////End Transaction///////////////////');
  // });
})
