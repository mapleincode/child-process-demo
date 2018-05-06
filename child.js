'use strict';

let time = 0;
let maxTime = 5000;

function log() {
    setTimeout(function() {
        console.log(`this time is ${++time}`);
        console.error(`this time is error log ${time}`);
        if(time < maxTime) {
            log();
        } else {
            process.exit(0);
        }
    }, 100);
}

log();