const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary')


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY
})


const storage=new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'Organizer', // Specify the folder name in Cloudinary
      formats: 'jpg'|| 'jpeg' || 'png', // Specify allowed file types
    },
  });

  
  module.exports = {cloudinary,storage,};