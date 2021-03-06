const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Redis = require("ioredis");

let port = process.env.PORT || 4000
let host = process.env.REDIS || "localhost"
console.log('process.env.REDIS', process.env.REDIS)
// const redis_sub = new Redis({host:"redis"});
// const redis_fetch = new Redis({host:"redis"});
console.log('redis host: ', host);
const redis_sub = new Redis(host);
const redis_fetch = new Redis(host);
//
const channels = {};

redis_sub.subscribe('messages').then(console.log('subscribe'));
redis_sub.on("message", (channel, message) => {
  // console.log(`Received ${message} from ${channel} ${Object.keys(channels)}`);
  let event =  {
      username: "redis",
      message: message,
      time: Date.now(),
    };
  // console.log(JSON.stringify(event))
  Object.keys(channels).forEach(id => sendEventsToAll(event, id));
});

function sendEventsToAll(event, channelId) {
  if (!channels[channelId]) {
    channels[channelId] = [];
  }

  channels[channelId].forEach((c) =>
    c.res.write(`data: ${JSON.stringify(event)}\n\n`)
  );
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/get/sensors", async(req, res) => {
    let list = await redis_fetch.lrange('sensors', 0, -1);
    res.send(JSON.stringify(list));
});

app.get("/get/plot_keys", async(req, res) => {
    let list = await redis_fetch.lrange('plot_keys', 0, -1);
    res.send(JSON.stringify(list));
});

app.get("/get/table_keys", async(req, res) => {
    let list = await redis_fetch.lrange('table_keys', 0, -1);
    res.send(JSON.stringify(list));
});

app.get("/:sensor/fetch", (req, res) => {
    // console.log(req.params);
    data_promise = redis_fetch.call('ts.range', req.params.sensor, '-', '+')
    // console.log(data_promise)
    let data;
    data_promise.then(results => {
            data = results.map(outer=>outer.map(inner=>Number(inner)));
            // data = results.map(outer=>Number(outer[1]));
            message = {'username':'redis',
                       'type': 'data',
                       'sensor': req.params.sensor,
                       'data': data,
                    };
            let status = res.send(JSON.stringify(message));
            return status
    }).catch(err=>{
            console.log(err, JSON.stringify(err));
            res.send(`${err}    ${JSON.stringify(err)}`);
        });
    // return res.send(JSON.stringify(req.params));
});

app.post("/:channelId/send", (req, res, next) => {
  const { channelId } = req.params;
  sendEventsToAll(req.body, channelId);
  return res.send("ok");
});

app.get("/:channelId/listen", function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  });

  const { channelId } = req.params;
  const clientId = Date.now();

  if (!channels[channelId]) {
    channels[channelId] = [];
  }

  channels[channelId].push({
    id: clientId,
    res,
  });

  const data = `data: ${JSON.stringify([
    {
      username: "Bot",
      message: "Welcome! Happy to see you ;)",
      time: Date.now(),
    },
  ])}\n\n`;

  res.write(data);

  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    channels[channelId] = channels[channelId].filter((c) => c.id !== clientId);
  });
});

app.listen(port, function () {
  console.log(`Server SSE listening on port ${port}!`);
});
