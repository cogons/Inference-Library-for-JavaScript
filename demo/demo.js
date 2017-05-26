"use strict";

var fs = require("fs");
var io = require('./io')
var bagua = require("./bagua");


/////////////// tf

var input = [28,28,1]

var opt = {
    pb:"../model-zoo/tf/mnist/mnist.pb"
}

/////// demo 1

var img = io.loadImage("./images/1.png", 0);
var output = bagua.create(input,opt).predict(img);
console.log(output)

/////// demo 2 (v)

// var clf = bagua.create(input,pb)
// var path = "./images/"
// var imgs = ['1.png','2.png','3.png'].map(i=>io.loadImage(path+i, 1))
// imgs.forEach(i=>console.log(clf.predict(i)[0]))

/////////////// mxnet

var input = [224,224,3]

var opt = {
    json:"../model-zoo/mxnet/inception/Inception-BN-symbol.json",
    params:"../model-zoo/mxnet/inception/Inception-BN-0126.params"
}

/////// demo 1

// var img = io.loadImage("./images/person.jpg", 3);
// var output = bagua.create(input,opt).predict(img);
// console.log(output)

/////// demo 2 (v)

// var clf = bagua.create(input,opt)
// var path = "./images/"
// var imgs = ['dog.jpg','person.jpg'].map(i=>io.loadImage(path+i, 3))
// imgs.forEach(i=>console.log(clf.predict(i)[0]))

/////////////// caffe

var input = [224,224,3]

var opt = {
    prototxt:'../model-zoo/caffe/VOC0712/SSD_300x300/deploy.prototxt',
    caffemodel:'../model-zoo/caffe/VOC0712/SSD_300x300/VGG_VOC0712_SSD_300x300_iter_120000.caffemodel'
}

/////// demo 1

// var img = io.loadImage("./images/dog.jpg");
// var clf = bagua.create(input,opt)
// var o = clf.predict(img);
// console.log(o)

/////// demo 2

// var clf = bagua.create(input,opt)
// var path = "./images/"
// var imgs = ['dog.jpg','person.jpg'].map(i=>io.loadImage(path+i, 3))
// imgs.forEach(i=>console.log(clf.predict(i)))