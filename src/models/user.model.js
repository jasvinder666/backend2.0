import mongoose, {Schema} from "mongoose"
const userSchema= new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
    },
    fullName: {
        type: String,
        required: true,
        trim: true, 
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true
    },
    coverImage: {
        type: String // cloudinary url
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            //instead of saving the whole video details here, it just saves the ID of that video
            ref: "Video"
            //tells Mongoose that this ID belongs to the Video collection.
        }
    ],
})

export const User=mongoose.model("User",userSchema)
