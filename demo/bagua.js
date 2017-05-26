"use strict";

var fs = require("fs");
var mx = require('../bagua-mxnet/src');
var tf = require("../bagua-tensorflow/src");
var caffe = require("../bagua-caffe/build/Release/caffe.node");
var assert = require('assert');


var LABELS = ["aeroplane", "bicycle", "bird", "boat",
    "bottle", "bus", "car", "cat", "chair",
    "cow", "diningtable", "dog", "horse",
    "motorbike", "person", "pottedplant",
    "sheep", "sofa", "train", "tvmonitor"];

function MX() {
    this.clf = new mx.MPrd()
    this.input_size = null
    this.load = function (params, json_, param_) {
        this.input_size = params
        var json_file = fs.readFileSync(json_);
        var param_file = fs.readFileSync(param_);
        return this.clf.create(params, json_file, param_file);
    }
    this.predict = function (image) {
        var transformer = new tf.io.Transformer(this.input_size); // HWC
        var img = transformer.preprocess(image)
        this.clf.setInput(img);
        return this.clf.run()
    }
}


function TF() {
    this.clf = null
    this.input_size = null
    this.g = null
    this.load = function (params, pb) {
        this.input_size = params
        var pb_ = fs.readFileSync(pb);
        this.g = new tf.Graph(pb_);
    }
    this.predict = function (image) {
        var transformer = new tf.io.Transformer([28, 28, 1]); // HWC
        transformer.setScale(1.0 / 255); // 0 ~ 255 => 0 ~ 1.0
        var sess = new tf.Session(this.g);
        var o = sess.run(["output"],
            {
                input: new tf.Tensor(transformer.preprocess(image))
            }
        );
        return new Float32Array(o.data.buffer);

    }
}

function CF() {
    this.net = null
    this.input_size = null
    this.g = null
    this.load = function (params, proto, model) {
        this.net = new caffe.Net(proto, model);
        this.input_size = this.net.blobs["data"].shape
    }
    this.predict = function (image) {
        var transformer = new caffe.io.Transformer(this.net.blobs["data"].shape);
        transformer.setMeanValue([104, 117, 123]);
        this.net.blobs["data"].data = transformer.preprocess(image);
        return this.net.forward()[0]
    }
}



exports.create = function (ctx) {

    assert(arguments.length == 2,'need 2 params')

    var input = arguments[0]
    var opt = arguments[1]

    if (opt.hasOwnProperty("prototxt")&&opt.hasOwnProperty("caffemodel")){
        var clf = new CF();
            clf.load(input, opt.prototxt, opt.caffemodel);
            return clf
    }
    else if (opt.hasOwnProperty("json")&&opt.hasOwnProperty("params")){
        var clf = new MX();
            clf.load(input, opt.json, opt.params);
            return clf
    }
    else if (opt.hasOwnProperty("pb")){
        var clf = new TF();
        clf.load(input, opt.pb);
        return clf
    }
    else console.log("wrong parameters, please check again.")

}