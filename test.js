
var ImageKit = require('imagekit');
var fs = require('fs');

var imagekit = new ImageKit({
    publicKey: "public_P+VtTOfg9FELjVxwzlkgLhskKF4=",
    privateKey: "private_yNzwJi+KIVZNvx6UAYt9LV3MDg8=",
    urlEndpoint: "https://ik.imagekit.io/umi98dev"
});

var base64Img = "iVBORw0KGgoAAAAN";

imagekit.upload({
    file : base64Img, //required
    fileName : "my_file_name.jpg",   //required
    tags: ["tag1","tag2"]
}, function(error, result) {
    if(error) console.log(error);
    else console.log(result);
});