const router = require('express').Router()
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const User = require('../model/imageuser');

const ImagesController = require('../controllers/imageController');

router.post('/',upload.single('image'),ImagesController.images_upload);

router.get("/",ImagesController.images_get_all);

router.delete("/:id",ImagesController.images_delete);

//router.put("/:id",upload.single("image"),ImagesController.images_update);

module.exports = router