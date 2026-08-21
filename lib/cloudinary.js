import { v2 as cloudinary } from 'cloudinary';

// Configure cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer to Cloudinary
 * @param {Buffer} buffer - The image file buffer
 * @param {String} folder - Optional folder name to organize images
 * @returns {Promise<String>} - Returns the secure URL of the uploaded image
 */
export const uploadToCloudinary = (buffer, folder = 'cgfwa') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(buffer);
  });
};

/**
 * Deletes an image from Cloudinary given its full URL
 * @param {String} url - The full Cloudinary URL
 * @returns {Promise<void>}
 */
export const deleteFromCloudinary = async (url) => {
  try {
    if (!url || !url.includes('cloudinary.com')) return;

    // Extract public ID from the URL
    // e.g. https://res.cloudinary.com/demo/image/upload/v1612345678/folder/image.jpg
    // We want: folder/image
    const urlParts = url.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    
    if (uploadIndex === -1) return;

    // The parts after 'upload/v12345678/' form the public_id
    // We also need to strip the file extension (.jpg, .png)
    const idWithExtension = urlParts.slice(uploadIndex + 2).join('/');
    const publicId = idWithExtension.substring(0, idWithExtension.lastIndexOf('.')) || idWithExtension;

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
      console.log(`Successfully deleted from Cloudinary: ${publicId}`);
    }
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
  }
};
