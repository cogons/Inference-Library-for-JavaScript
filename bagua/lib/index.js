var assert = require('assert')
var mx = require('../../bagua-mxnet')
var tf = require('../../bagua-tensorflow')
var cf = require('../../bagua-caffe')
var fs = require('fs')

var bagua = {

}


bagua.Model = function (params, type) {

    this.type = type || undefined
    this.input_shape = params.input_shape||undefined
    this.def_file = params.def_file||undefined
    this.params_file = params.params_file||undefined

}

bagua.Predictor = function (model) {

    assert(arguments.length == 1, 'need 1 params')

    switch (model.type) {
        case "mx":
            var prd = new MX()
            prd.load(model.input_shape, model.def_file, model.params_file);
            return prd
        case "tf":
            var prd = new TF()
            prd.load(model.def_file);
            return prd
        case "caffe":
            var prd = new caffe.Net(model.def_file, model.params_file);
            return prd
    }
}

bagua.Predictor.a =1

bagua.Model.prototype.k = function () {
    console.log("k")
}

module.exports = bagua




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

