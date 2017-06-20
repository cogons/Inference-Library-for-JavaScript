"use strict";

var fs = require("fs");
var io = require('../cv').io
var bagua = require("../bagua");


/////////////// mxnet

var params = {
    input_shape: [224, 224, 3],
    def_file: "../model-zoo/mxnet/inception/Inception-BN-symbol.json",
    params_file: "../model-zoo/mxnet/inception/Inception-BN-0126.params",
    mean: [112, 112, 112]

}

var model = new bagua.Model(params, "mx")

var prd = new bagua.Predictor(model)

/////// demo 1

var img = io.loadImage("./images/person.jpg", 3);
var output = prd.predict(img);
console.log(output)


/////// demo 2 (v)

// var clf = bagua.create(input,opt)
// var path = "./images/"
// var imgs = ['dog.jpg', 'person.jpg'].map(i => io.loadImage(path + i, 3))
// imgs.forEach(i => console.log(prd.predict(i)[0]))