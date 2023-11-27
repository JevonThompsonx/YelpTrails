import mongoose, { Schema } from "mongoose";
import joi from 'joi';
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
}), joiCommentSchema = joi.object({
    title: joi.string().required(),
    user: joi.string().required(),
    posted: joi.string(),
    text: joi.string().required()
});
const comment = mongoose.model("comment", commentSchema);
export { comment, commentSchema, joiCommentSchema };
