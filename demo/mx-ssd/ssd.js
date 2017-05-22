exports.parse = function (output, image) {
  var w = image.cols, h = image.rows;
  
  var f = new Float32Array(output);
  var num_det = output.length;
  var out = [];

  for (var i = 0; i < num_det; i++) {
    if (f[i * 6] >= 0) {
      var o = {
        label: f[i * 6] | 0,
        score: f[i * 6 + 1],
        xmin: (f[i * 6 + 2] * w) | 0,
        ymin: (f[i * 6 + 3] * h) | 0,
        xmax: (f[i * 6 + 4] * w) | 0,
        ymax: (f[i * 6 + 5] * h) | 0
      };
      out.push(o);
    }
  }

  return out;
};
