import mongoose from 'mongoose'
const {Schema} = mongoose;
import { locationSchema } from './location.js';
import { commentSchema } from './comment.js';
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
    },
    photoUrl: {
        type: String,
        required: false,
        default: 'https://images.unsplash.com/photo-1459231978203-b7d0c47a2cb7?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
})

const trail = mongoose.model('trail',trailSchema)

export {trail,trailSchema}