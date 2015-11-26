var brain = require('brain')

module.exports = function(RED){
  function Brain(config){
    RED.nodes.createNode(this, config)

    var node = this

    node.status({
      fill: 'grey',
      shape: 'dot',
      text: 'waiting'
    })

    this.on('input', function(msg){

      var net = new brain.NeuralNetwork({
        learningRate: node.learningRate
      })

      node.status({
        fill: 'yellow',
        shape: 'dot',
        text: 'training'
      })

      var trainStream = net.createTrainStream({

        floodCallback: function() {
          flood(trainStream, msg.trainData);
        },

        doneTrainingCallback: function(obj) {
          node.status({
            fill: 'green',
            shape: 'dot',
            text: 'done'
          })
          msg.payload = net.run(msg.runData)
          node.send(msg)
        }
      });

      flood(trainStream, msg.trainData);

      function flood(stream, data) {
        for (var i = 0; i < data.length; i++) {
          stream.write(data[i]);
        }

        stream.write(null);
      }

      // net.train(msg.trainData, {
      //   errorThresh: config.errorThresh,
      //   iterations: config.iterations,
      //   log: config.log,
      //   learningRate: config.learningRate,
      //   logPeriod: config.logPeriod
      // })

    })
  }

  RED.nodes.registerType('brain', Brain)
}