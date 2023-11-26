import mongoose from "mongoose";
import joi from "joi";
const { Schema } = mongoose,
	locationSchema = new Schema({
		city: {
			type: String,
			required: [true, "Trail city location required"],
		},
		state: {
			type: String,
			required: [true, "Trail state location required"],
		},
		growth_from_2000_to_2013: {
			type: String,
			required: false,
			default: "unknown",
		},
		latitude: {
			type: Number,
			required: false,
		},
		longitude: {
			type: Number,
			required: false,
		},
		population: {
			type: String,
			required: false,
		},
		rank: {
			type: String,
			required: false,
		},
	}),
	joiLocationSchema = joi.object({
		state: joi.string().required(),
		city: joi.string().required(),
		latitute: joi.number(),
		longitude: joi.number(),
		population: joi.string(),
		rank: joi.string(),
		growth_from_2000_to_2013 : joi.string()
	});
const location = mongoose.model("location", locationSchema);

export { location, locationSchema, joiLocationSchema };
