// (1) Declare your store name (perhaps in a .env file, so that this module is re-usable).
// (2) Every 5 seconds, simulate a new customer order.
// (3) Create a fake order as an object: storeName, orderId, customerName, address.
// (4) Emit a ‘pickup’ event and attach the fake order as a payload. HINT: Have some fun by using the faker library to make up phony information
// (5) Monitor the system for events.
// (6) Whenever the ‘delivered’ event occurs, log “thank you” to the console.

'use strict';

