import mongoose from 'mongoose'

const userSchema = new mongoose.schema({
    name:{
        type:String,
        required:[true,'Name is Required'],
        trim:true,
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        trim:true,
        lowercase:true,
    },
    phone:{
        type:Number,
        required: [true,'Phone Number is required'],
        unique:true,
        trim:true,
        
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("User",userSchema);