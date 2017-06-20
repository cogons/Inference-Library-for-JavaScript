"use strict";

var fs = require("fs");
var io = require('../cv').io
var bagua = require("../bagua");


/////////////// tf

var input = [28,28,1]

var opt = {
    pb:"../model-zoo/tf/mnist/mnist.pb"
}

/////// demo 1

// var img = io.loadImage("./images/1.png", 0);
// var output = bagua.create(input,opt).predict(img);
// console.log(output)

/////// demo 2 (v)

// var clf = bagua.create(input,pb)
// var path = "./images/"
// var imgs = ['1.png','2.png','3.png'].map(i=>io.loadImage(path+i, 1))
// imgs.forEach(i=>console.log(clf.predict(i)[0]))