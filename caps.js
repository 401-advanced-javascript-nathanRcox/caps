// This is the main hub--the brain--which . . . 
// (1) manages the state of every package (ready for pickup, in transit, delivered, etc) and 
// (2) logs every event to the console with a timestamp and the event payload, i.e. “EVENT {}”.

'use strict';

const events = require('./events');

require('./modules/driver');
require('./modules/vendor');

events.on('order-received', (payload) => {
  events.emit('pickup', payload);
  console.log('EVENT', { event: 'pickup', time: new Date(), payload });
});

events.on('in-transit', (payload) => {
  console.log('EVENT', { event: 'in-transit', time: new Date().toString, payload });
});

events.on('delivered', (payload) => {
  events.emit('delivered-message', payload);
  console.log('EVENT', { event: 'delivered', time: new Date(), payload });
  console.log('/////////////////////End Transaction///////////////////');
});

///////////Refactoring per class 12 code reivew//////////

// events.on('pickup', (payload) => logEvent('pickup', payload));
// events.on('in-transit', (payload) => logEvent('in-transit', payload));
// events.on('delivered', (payload) => logEvent('delivered', payload));

// function logEvent(event, payload) {
//   const time = new Date().toString();
//   console.log('EVENT', { event, time, payload });
// }
