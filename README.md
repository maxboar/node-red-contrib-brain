# node-red-contrib-brain2

[![npm](https://img.shields.io/npm/dm/node-red-contrib-brain2.svg)](https://www.npmjs.com/package/node-red-contrib-brain2)
[![npm](https://img.shields.io/npm/v/node-red-contrib-brain2.svg)](https://www.npmjs.com/package/node-red-contrib-brain2)

# Install

```bash

$ cd $HOME/.node-red
$ npm install node-red-contrib-brain2

```

Or globally alongside Node-RED:

```bash

sudo npm install -g node-red-contrib-brain2

```

**You will need to restart Node-RED for it to pick-up the new nodes.**

# Usage

node-red-contrib-brain2 is based on [brain](https://github.com/harthur/brain). You need to see it basic usage at first.

## Import network

When there is `msg.netJSON` input, network wil be reloaded with JSON provided

## Train

When `brain` node receive `msg.trainData`, it trains the network and output `net.toJSON` in `msg.net`.
Additional network options can be provided in `msg.neuralNetworkOptions`. See [brain options doc](https://github.com/harthur/brain/#options-1).

## Run

When there is `msg.runData` input, `brain` node will run `net.run()` with data provided. And output the result in `msg.decision`.

# Example

```json
[{"id":"b3bd8bc0.b3a68","type":"debug","z":"7f66fc40.e319a4","name":"","active":true,"console":"false","complete":"decision","x":730,"y":440,"wires":[]},{"id":"28113a05.5a4d66","type":"inject","z":"7f66fc40.e319a4","name":"inject to run from network saved to flow","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":190,"y":440,"wires":[["d7867c2d.4a5ec"]]},{"id":"d7867c2d.4a5ec","type":"function","z":"7f66fc40.e319a4","name":"fake data","func":"msg.runData = { r: 1, g: 0.4, b: 0 }\nmsg.netJSON = flow.get(\"net\");\nreturn msg;","outputs":1,"noerr":0,"x":420,"y":440,"wires":[["6e3eac3e.09b554"]]},{"id":"ddac5726.90d5a","type":"debug","z":"7f66fc40.e319a4","name":"","active":true,"console":"false","complete":"net","x":720,"y":320,"wires":[]},{"id":"6eb2008.5eaa28","type":"inject","z":"7f66fc40.e319a4","name":"inject to train","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":270,"y":320,"wires":[["7d2cbf20.5940e8"]]},{"id":"7d2cbf20.5940e8","type":"function","z":"7f66fc40.e319a4","name":"fake data","func":"// This function return a fake json array\nmsg.trainData = [{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},\n           {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},\n           {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]\n\nreturn msg;","outputs":1,"noerr":0,"x":420,"y":320,"wires":[["2eece628.29eab2"]]},{"id":"d1902d95.7145b","type":"function","z":"7f66fc40.e319a4","name":"save network to flow","func":"if (!!msg.net) flow.set(\"net\",msg.net);\nreturn msg;","outputs":1,"noerr":0,"x":780,"y":260,"wires":[[]]},{"id":"9858fd.1b8e7f","type":"inject","z":"7f66fc40.e319a4","name":"inject to run","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":270,"y":360,"wires":[["5b9f6fc3.1652e8"]]},{"id":"5b9f6fc3.1652e8","type":"template","z":"7f66fc40.e319a4","name":"runData","field":"runData","fieldType":"msg","format":"json","syntax":"plain","template":"{ r: 1, g: 0.4, b: 0 }","x":420,"y":360,"wires":[["2eece628.29eab2"]]},{"id":"2eece628.29eab2","type":"brain2","z":"7f66fc40.e319a4","name":"brain2","learningRate":0.3,"errorThresh":0.005,"iterations":20000,"log":false,"logPeriod":10,"x":570,"y":320,"wires":[["ddac5726.90d5a","d1902d95.7145b","b3bd8bc0.b3a68"]]},{"id":"6e3eac3e.09b554","type":"brain2","z":"7f66fc40.e319a4","name":"brain2","learningRate":0.3,"errorThresh":0.005,"iterations":20000,"log":false,"logPeriod":10,"x":570,"y":440,"wires":[["b3bd8bc0.b3a68"]]}]
```


# License 

MIT License
