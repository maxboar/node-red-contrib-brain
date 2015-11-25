var brain = require('brain')

module.exports = function(RED){
  function Brain(config){
    RED.nodes.createNode(this, config)

    var node = this

    this.on('input', function(msg){
      var net = new brain.NeuralNetwork({
        learningRate: node.learningRate
      })
      net.train(msg.trainData, {
        errorThresh: config.errorThresh,
        iterations: config.iterations,
        log: config.log,
        learningRate: config.learningRate,
        logPeriod: config.logPeriod
      })
      msg.payload = net.run(msg.runData)
      node.send(msg)
    })
  }

  RED.nodes.registerType('brain', Brain)
}