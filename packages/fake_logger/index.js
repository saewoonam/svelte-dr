const Redis = require('ioredis')
const logger = require('pino')()

const redisPub = new Redis();
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
        message.type = 'temperatures'
        message.stage2 = 2 + 2*0.1*Math.random()
        message.stage1 = 50 + 50*0.1*Math.random()
        await wait(1500);
        console.log(JSON.stringify(message))
        await redisPub.publish('messages', JSON.stringify(message))
        busyGetData = false;
    } else {
        console.log('getData, busy from before')
    }
}
setInterval(getData, 10000);

// redisPub.disconnect()
