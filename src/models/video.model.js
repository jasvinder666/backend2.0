import mongoose,{Schema} from mongoose
//mongoose-aggregate-paginate-v2 is a plugin that makes it easy to add pagination (page-wise results) 
// to Mongoose aggregation queries without writing skip/limit logic manually.
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken"
//// bcrypt is used for hashing and comparing passwords
//Hashing passwords means converting them into a secure, 
// irreversible scrambled form so that the real password is never stored in the database.
import bcrypt from "bcrypt"
const videoSchema= new Schema(
    {
        videoFile:{
            type: String, //cloudinary url
            required: true
        },
        thumbnail: {
            type: String, //cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number, 
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner:{
            type: Schema.Types.ObjectId,// Reference to another collection
            ref:"User"// Refers to the User model
        }
    },
    {
        timestamps: true
    }
)
userSchema.pre("save",async function(next) {//We’re telling Mongoose: "Before saving a user (save), run this async function."
    if(!this.isModified("password")) return next();
    // If password not changed, skip
    this.password= bcrypt.hash(this.password,10)
    // Hash with salt rounds = 10
    next()//after hashing, tell Mongoose to continue with saving the user into the database.
})
// Method: compares entered password with hashed password in DB
userSchema.methods.isPasswordCorrect= async function
(password){
    return await bcrypt.compare(password,this.password)
}
videoSchema.plugin(mongooseAggregatePaginate)
// Create an Access Token (short time use, for login sessions)
userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECERT,{
            // secret key from .env
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            // how long token is valid
        }
    )
}
// Create a Refresh Token (long time use, to get new access tokens)
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id: this._id,// only user id needed
        },
        process.env.REFRESH_TOKEN_SECERT,{
            // refresh token secret key
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const Video=mongoose.model("Video",videoSchema)