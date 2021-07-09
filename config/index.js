require("dotenv").config();

module.exports = {
    DB: process.env.APP_DB,
    PORT:process.env.APP_PORT,
    SECRET: process.env.APP_SECRET,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY
};

