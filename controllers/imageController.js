const User = require('../model/imageuser');
const cloudinary = require('../utils/cloudinary');

exports.images_upload = async(req,res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        //create an instance of the user
        let user = new User({
            name:req.body.name,
            avatar:result.secure_url,
            cloudinary_id:result.public_id,
        });
        //save user
        await user.save();
        res.json(result);
    } catch(err) {
        console.log(err)
    }
}

exports.images_get_all = async(req,res) => {
    try {
        let user = await User.find();
        res.json(user);
    } catch(err) {
        console.log(err);
    }
}

exports.images_delete = async (req,res) => {
    try {
        //find super admin by id
        let user = await User.findById(req.params.id);
        //Delete image from cloudinary
        await cloudinary.uploader.destroy(user.cloudinary_id);
        //Delete user from db
        await user.remove();
        res.json('Sucessfully deleted');
    } catch(err) {
        console.log(err);
    }
}

/*exports.images_update = async(req,res) => {
    try {
        let user = await User.findById(req.params.id);

        await cloudinary.uploader.destroy(user.cloudinary_id);

        const result = await cloudinary.uploader.upload(req.file.path);
        const data = {
            name: req.body.name || user.name,
            avatar:result.secure_url || user.avatar,
            cloudinary_id:result.public_id || user.cloudinary_id,
        };
        user = await User.findByIdAndUpdate(req.params.id,data,{new:true});
        res.json(user);
    }catch(err) {
        console.log(err);
    }
}*/