import mongoose from 'mongoose'
const {Schema} = mongoose;
const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    posted: {
        type: Date,
        required: true,
        default: new Date
    }, 
    text: {
        type: String, 
        require: true
    }
})
const trailSchema = new Schema( {
    name : {
        type:String,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    owner: {
        type: String,
        required: false,
        default: 'Unknown'
    }, 
    location : {
        type: String 
    },
    description : {
        type: String, 
        required: false 
    },
    comments: {
        type: [commentSchema],
        required: true,
        default: {}
    }
})

const userSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    birthDay: {
        type: Date,
        required: true
    },
    // age: (new Date - birthDay),
    comments: {
        type: [String],
        required: true,
        default: []
    }

})

const trail = mongoose.model('trail',trailSchema)
const user = mongoose.model('trail',userSchema)
const comment = mongoose.model('trail',commentSchema)

export {trail,user,comment }