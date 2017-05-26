"use strict";

var fs = require("fs");
var io = require('./io')

var bagua = require("./bagua");


// var json_file = "../model-zoo/mxnet/inception/Inception-BN-symbol.json"
// var param_file = "../model-zoo/mxnet/inception/Inception-BN-0126.params"
var params = [28, 28, 1]


// var clf = bagua.create("mx")
// clf.load(params, json_file, param_file)
// clf.feed(img);
// var output = clf.run();

// output.forEach(o => {
//     if (o > 0.1) console.log(o)
// })



var image = io.loadImage("./images/1.png", 0);
var transformer = new io.Transformer(params);
transformer.setScale(1.0/255);
var img = transformer.preprocess(image)

var pb = "../model-zoo/tf/mnist/mnist.pb"


var clf = bagua.create("tf")
clf.load(pb)
clf.feed(img)
// var output = clf.run();