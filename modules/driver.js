// (1) Monitor the system for events. 
// (2) On the ‘pickup’ event, wait 1 second, then log “DRIVER: picked up [ORDER_ID]” to the console.
// (3) Emit an ‘in-transit’ event with the payload you received.
// (4) Wait 3 seconds, then log “delivered” to the console.
// (5) Emit a ‘delivered’ event with the same payload.

'use strict';