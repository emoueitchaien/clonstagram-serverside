const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types 

const postSchema = new mongoose.Schema({
    // title:{
    //     type: String,
    //     required: true
    // }, 
    caption:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true
        // default: "no photo"
    },
    postedBy:{
        type: ObjectId,
        ref: "User"
    }
})

mongoose.model("Post",postSchema)
