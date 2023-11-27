import mongoose, { Schema,model } from "mongoose";
import joi from "joi";
import { commentSchema, comment } from "./comment.js";

const ObjectId = Schema.Types.ObjectId,
	userSchema = new Schema({
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
		comments: [
			{
				type: ObjectId,
				ref: "comment",
			},
		],
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
	user = model("user", userSchema);

export { user, userSchema, joiUserSchema };
