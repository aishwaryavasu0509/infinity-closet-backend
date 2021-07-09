// i have temporarily used a schema this is not the final one.

const mongoose=require('mongoose');
const imageSchema = new mongoose.Schema({
    name: {
        type:String,
    },
    avatar: {
        type:String,
    },
    cloudinary_id: {
        type: String,
    },
});

module.exports = mongoose.model('imageuser',imageSchema);