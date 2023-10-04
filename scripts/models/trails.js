import mongoose from 'mongoose';
const { Schema } = mongoose;
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
        type: String
    },
    description: {
        type: String,
        required: false
    }
});
const trail = mongoose.model('trail', trailSchema);
export { trail, trailSchema };
