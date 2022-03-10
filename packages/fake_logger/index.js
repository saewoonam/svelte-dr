const Redis = require('ioredis')
const logger = require('pino')()

const redis = new Redis();
// logger.info(redis)
// console.log(redis)

function wait(ms) {
    return new Promise((resolve, reject)=>{setTimeout(resolve, ms);});
}

let busyGetData = false;
async function getData() {
    if (!busyGetData) {
        busyGetData = true;
        console.log( 'getData', (new Date()).getTime() )
        let message = {'time': (new Date()).getTime()}
        message.sensor1 = 2
        message.sensor2 = 50
        await wait(1500);
        console.log(message)
        busyGetData = false;
    } else {
        console.log('getData, busy from before')
    }
}
setInterval(getData, 1000);

redis.disconnect()
