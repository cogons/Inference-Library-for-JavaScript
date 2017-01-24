# How to build bagua-caffe
Build the code. Please follow [Caffe instruction](http://caffe.berkeleyvision.org/installation.html) to install all necessary packages and build it.

  ```shell
  # Modify Makefile.config according to your Caffe installation.

  make -j8

  # Build Node.js Addons

  node-gyp configure build
  ```

# Demo
Here we provided a SSD demo for object detection.

1. Download [SSD300*](http://www.cs.unc.edu/~wliu/projects/SSD/models_VGGNet_VOC0712_SSD_300x300.tar.gz), and only extract the **caffemodel** file into model-zoo/caffe/VOC0712/SSD_300x300.

2. cd demo/caffe-ssd && node demo.js