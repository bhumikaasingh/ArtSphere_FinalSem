const multer = require('multer')
const path = require('path')
//Validate upload file
const FILE_TYPE_MAP = {
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/jpg": "jpg",
};

//Upload image to server
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        //validate weather the file is a valid image
        if (!isValid) cb(new Error("Invalid file type"), "./images/user_image");
        else cb(null, "./images/user_image"); // path where we upload an image
    },
    filename: function (req, file, cb) {
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `IMG-${Date.now()}.${extension}`);
    },
});

var uploadOptions = multer({ storage: storage });

module.exports=uploadOptions