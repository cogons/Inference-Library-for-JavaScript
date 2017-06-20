var cv = require('cv');


console.log(cv.io.loadImage)
var img = cv.io.loadImage("./images/dog.jpg", 3)
// console.log(img)
// cv.io.show("im",img)