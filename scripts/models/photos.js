import mongoose, { Schema } from "mongoose";
const photosSchema = new Schema({
    link: {
        type: String,
        required: [true, 'Photo url link required']
    },
});
const photo = mongoose.model("photo", photosSchema);
export default photo;
