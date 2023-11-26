import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		required: [true,'Valid login id required to sign up'] 
	},
	birthDay: {
		type: Date,
		required: false,
	},
	// age: (new Date - birthDay),
	comments: {
		type: [String],
		required: false,
		default: [],
	},
	role: {
		type: ["user", "admin"],
		required: true,
		default: "user",
	},
});

const user = mongoose.model("user", userSchema);

export { user, userSchema };
