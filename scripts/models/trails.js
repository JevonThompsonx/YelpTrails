import mongoose from 'mongoose';
const { Schema } = mongoose;
import { locationSchema } from './location.js';
import { commentSchema } from './comment.js';
import { tagTypes } from '../seeds/seedData/index.js';
const trailSchema = new Schema({
    name: {
        type: String,
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
    location: {
        type: locationSchema,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    comments: {
        type: [commentSchema],
        required: false,
        default: []
    },
    tags: {
        type: [...tagTypes],
        required: false,
        decault: []
    },
    rating: {
        type: String,
        required: false,
        default: "⭐⭐⭐"
    }
});
const trail = mongoose.model('trail', trailSchema);
export { trail, trailSchema };
