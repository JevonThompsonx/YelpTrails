import mongoose from "mongoose";
const { Schema } = mongoose;
const commentSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Comment title cannot be blank']
    },
    user: {
        type: String,
        required: [true, 'Cannot post unless signed in ']
    },
    posted: {
        type: Date,
        required: false,
        default: new Date(),
    },
    text: {
        type: String,
        require: [true, 'Cannot post blank comment']
    },
});
const comment = mongoose.model("comment", commentSchema);
export { comment, commentSchema };
