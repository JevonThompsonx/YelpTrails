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

const locationSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    growth_from_2000_to_2013: {
        type: String,
        required: false,
        default: 'unknown'
    },latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },population: {
        type: String,
        required: true
    },rank: {
        type: String,
        required: true
    },state: {
        type: String,
        required: true
    }
})
//chat gpt generated tag names
//Prompt: "Give me a long javascript array of commonly used descriptive words for a hiking trail"
import { tagTypes } from '../seeds/seedData/index.js';
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
        type: locationSchema ,
        required:true
    },
    description : {
        type: String, 
        required: false 
    },
    comments: {
        type: [commentSchema],
        required: false,
        default: []
    },
    tags : {
        type: [...tagTypes],
        required: false,
        decault: []
    },
    rating: {
        type: String,
        required: false,
        default: "⭐⭐⭐"
    }
})

const trail = mongoose.model('trail',trailSchema)
const user = mongoose.model('user',userSchema)
const comment = mongoose.model('comment',commentSchema)
const location = mongoose.model('location',locationSchema)


export {trail,user,comment,location,trailSchema}