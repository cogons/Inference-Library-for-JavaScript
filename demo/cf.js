"use strict";

var fs = require("fs");
var io = require('../cv').io
var bagua = require("../bagua");


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