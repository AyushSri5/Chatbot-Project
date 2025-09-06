import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    id:{
        type: String,
    },
    name:{
        type:String,
        required:true
    },
    course: {
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        default: Date.now()
    },
    updatedAt:{
        type:String,
        default: Date.now()
    }
})

export const Video =
  mongoose.models.Video || mongoose.model("Video", videoSchema);