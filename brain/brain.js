var brain = require('brain')

module.exports = function(RED){
  function Brain(config){
    RED.nodes.createNode(this, config)
    var node = this

    this.on('input', function(msg){
      var net = new brain.NeuralNetwork({
        learningRate: node.learningRate
      })
      msg.payload = net.train(msg.payload)
      node.send(msg)
    })
  }

  RED.nodes.registerType('brain', Brain)
}