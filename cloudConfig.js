const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({ // In this we need to declear the folder where we we waana save the files...........
  cloudinary: cloudinary,
  params: {
    folder: 'tripnest_DEV',
    allowed_formats: ['png','jpg','jpeg','pdf'],
    resource_type: 'auto' // its for important if uploading non-image files..............
  },
});


module.exports = {cloudinary,storage}