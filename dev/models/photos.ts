import mongoose, { Schema,model} from "mongoose";

const photosSchema = new Schema({
	link: {
		type: String,
		required: [true,'Photo url link required'] 
	},
});

const photo = model("photo", photosSchema);

export default photo;
