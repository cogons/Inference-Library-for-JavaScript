var fs = require("fs");
var mx = require('bagua-mxnet');
var cv = require('cv').io

// load essentials
console.log(cv)
var image = cv.loadImage("../images/cat.png", 3);
var json_file = fs.readFileSync("../../model-zoo/mxnet/inception/Inception-BN-symbol.json");
var param_file = fs.readFileSync("../../model-zoo/mxnet/inception/Inception-BN-0126.params");
var nd_file = fs.readFileSync("../../model-zoo/mxnet/inception/mean_224.nd");
var params = [224,224,3]

// // preprocess

var transformer = new cv.Transformer(params);
transformer.setMeanValue(Array.prototype.slice.call(nd_file, 0)); // 0 ~ 255 => 0 ~ 1.0
var img = transformer.preprocess(image)


// // create a pridictor

var prd = new mx.MPrd();

prd.create(params, json_file, param_file);
prd.setInput(img);
var output = prd.run();

console.log(output)

// // process output

var syn = loadSynset("../../model-zoo/mxnet/inception/synset.txt")
console.log('Best Guess: ', syn[maxIndex(output)])

// utils

function maxIndex(probabilities) {
  var best = 0;
  for (var i = 1; i < probabilities.length; ++i) {
    if (probabilities[i] > probabilities[best]) {
      best = i;
    }
  }
  return best;
}

function loadSynset(path) {
  return fs.readFileSync(path).toString('ascii').split("\n").map(function (data) {
    return data.substring(10)
  })
}
