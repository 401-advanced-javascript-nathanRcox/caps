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
  console.log('EVENT', { event: 'in-transit', time: new Date(), payload });
});

events.on('delivered', (payload) => {
  events.emit('delivered-message', payload);
  console.log('EVENT', { event: 'delivered', time: new Date(), payload });
  console.log('/////////////////////End Transaction///////////////////');
});
