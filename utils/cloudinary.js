const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:'psg-college-of-technology',
    api_key:'357356911165597',
    api_secret:'kIi1AQOnWNfcjtZjSDpaz3IaOQk'
})

module.exports = cloudinary;
