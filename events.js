// This is the global event pool that is shared by all modules.

'use strict';

const Events = require('events'); // This is a native 'library' within node.js.

const events = new Events(); // Make only one instance of this in the app. 

module.exports = events;

