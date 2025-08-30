//We upload to Cloudinary because it stores, optimizes, and delivers 
// media files in the cloud faster and more securely than our own server.

import { v2 as cloudinary } from "cloudinary"
import fs from "fs"//fs stands for File System module in Node.js.

// Configure cloudinary with credentials stored in environment variables
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // your Cloudinary account name
  api_key: process.env.CLOUDINARY_API_KEY,        // your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET   // your Cloudinary API secret
});

// Function to upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // if no file path is given, stop and return null
        if (!localFilePath) return null

        // upload the file to Cloudinary
        // resource_type: "auto" → automatically detects type (image, video, etc.)
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // after uploading, remove the file from local storage (cleanup)
        fs.unlinkSync(localFilePath)//this should be Sync because it must be done

        // return the Cloudinary response (contains file URL and other info)
        return response;

    } catch (error) {
        // if upload fails, delete the local file too (avoid unused files)
        fs.unlinkSync(localFilePath) 
        return null; // return null to indicate failure
    }
}
