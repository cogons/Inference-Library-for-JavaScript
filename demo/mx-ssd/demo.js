"use strict";

var fs = require("fs");
var mx = require('../../bagua-mxnet/src');
var SSD = require("./ssd.js");
var io = require('../io')

var LABELS = ["aeroplane", "bicycle", "bird", "boat",
     "bottle", "bus", "car", "cat", "chair",
     "cow", "diningtable", "dog", "horse",
     "motorbike", "person", "pottedplant",
     "sheep", "sofa", "train", "tvmonitor"];


// load essentials

var image = io.loadImage("../images/dog.jpg", 3);
var json_file = fs.readFileSync("../../model-zoo/mxnet/ssd/deploy_ssd_300-symbol.json");
var param_file = fs.readFileSync("../../model-zoo/mxnet/ssd/deploy_ssd_300-0000.params");
var params = [300,300,3]

// preprocess

var transformer = new io.Transformer(params);
var img = transformer.preprocess(image)


// create a pridictor

var prd = new mx.MPrd();

prd.create(params, json_file, param_file);
prd.setInput(img);
var output = prd.run();

// process output

show(output)

// utils

function show (blob) {
  let detections = SSD.parse(blob, img);

  detections.forEach(o => {
    if (o.score > 0.3) {
      console.log(LABELS[o.label], o.score.toFixed(3), "@", o.xmin, o.ymin, o.xmax, o.ymax);
      img.rectangle(o.xmin, o.ymin, o.xmax, o.ymax);
    }
  });
  io.show("Result", img);
  io.waitKey();
}