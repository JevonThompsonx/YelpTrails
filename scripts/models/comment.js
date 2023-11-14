import mongoose from 'mongoose';
const { Schema } = mongoose;
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
});
const comment = mongoose.model('comment', commentSchema);
export { comment, commentSchema };
