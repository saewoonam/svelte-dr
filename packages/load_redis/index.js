const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const Redis = require("ioredis")
const redis = new Redis();

(async function processLineByLine() {
  try {
    const rl = createInterface({
      input: createReadStream('Cooldown_data.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      // Process the line.
        if (line.length>0) {
            // console.log(line, line.length);
            let split = line.split(' ')
            let date = new Date(split[0] + ' ' + split[1]);
            let timestamp = date.getTime();
            console.log(`${timestamp} ${split[2]} ${split[3]}`);
            redis.call('ts.add', 'stage2', `${timestamp}`, `${split[2]}`)
            redis.call('ts.add', 'stage1', `${timestamp}`, `${split[3]}`)
        }
    });

    await once(rl, 'close');

    console.log('File processed.');
    // redis.disconnect();
  } catch (err) {
    console.error(err);
  }
})();
