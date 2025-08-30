import multer from "multer";
//Multer is used in Node.js/Express to handle file uploads 
// (like images, videos, PDFs) from the user’s computer to your server.

// Define where and how files will be stored on the server
const storage = multer.diskStorage({

    // 'destination' → tells multer where to save uploaded files
    destination: function (req, file, cb) {
        // save all files in the folder: ./public/temp
        cb(null, "./public/temp")
    },

    // 'filename' → tells multer what to name the saved file
    filename: function (req, file, cb) {
        // use the file's original name (same as uploaded by user)
        cb(null, file.originalname)
    }
})

// Create the multer upload middleware
export const upload = multer({ 
    storage,  // use the above storage settings
})