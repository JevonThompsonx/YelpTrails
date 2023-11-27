import mongoose, { Schema } from "mongoose";
import joi from "joi";
import { commentSchema } from "./comment";

const userSchema = new Schema({
		userID: {
			type: String,
			required: [true, "Valid login id required to sign up"],
		},
		password: {
			type: String,
			required: [true, "Valid password required to sign up"],
		},
		birthDay: {
			type: Date,
			required: false,
		},
		// age: (new Date - birthDay),
		comments: commentSchema,
		role: {
			type: ["user", "admin"],
			required: false,
			default: "user",
		},
	}),
	joiUserSchema = joi.object({
		userID: joi.string().required,
		password: joi.string().required,
		birthday: joi.date(),
		comments: joi.array().items(joi.string()) || joi.array().empty(),
		role: joi.string(),
	}),
	user = mongoose.model("user", userSchema);

export { user, userSchema, joiUserSchema };
