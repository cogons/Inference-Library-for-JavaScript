"use strict";

var fs = require("fs");
var mx = require('../bagua-mxnet/src');
var tf = require("../bagua-tensorflow/src");

var LABELS = ["aeroplane", "bicycle", "bird", "boat",
    "bottle", "bus", "car", "cat", "chair",
    "cow", "diningtable", "dog", "horse",
    "motorbike", "person", "pottedplant",
    "sheep", "sofa", "train", "tvmonitor"];


// load essentials

// var image = mx.io.loadImage("../images/dog.jpg", 3);
// var json_file = fs.readFileSync("../../model-zoo/mxnet/ssd/deploy_ssd_300-symbol.json");
// var param_file = fs.readFileSync("../../model-zoo/mxnet/ssd/deploy_ssd_300-0000.params");
// var params = [300,300,3]

function MX() {
    this.clf = new mx.MPrd()
    this.load = function (params, json_, param_) {
        var json_file = fs.readFileSync(json_);
        var param_file = fs.readFileSync(param_);
        return this.clf.create(params, json_file, param_file);
    }
    this.feed = function (img) {
        return this.clf.setInput(img);
    }
    this.run = function () {
        return this.clf.run()
    }
}


function TF() {
    this.clf = null
    this.input = null
    this.load = function (gd_) {
        var g = new tf.Graph(gd_);
        var s = new tf.Session(g);
        return s
    }
    this.feed = function (img) {

        console.log(img)

        this.input = new tf.Tensor(img)

    }
    this.run = function () {
        var o = this.clf.run(["output"],
            {
                input: this.input
            }
        )
        return o.data.buffer
    }
}

exports.create = function (ctx) {

    if (ctx == "mx") return new MX();
    if (ctx == "tf") return new TF();
    else return new Net()

}