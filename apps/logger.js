'use strict';

function logEvent(event, payload) {
  const time = new Date().toString();
  console.log('EVENT', { event, time, payload });
}

module.exports = logEvent;
