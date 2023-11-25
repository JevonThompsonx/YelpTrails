import mongoose from "mongoose";
const { Schema } = mongoose;

const locationSchema = new Schema({
	city: {
		type: String,
		required: true,
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
	state: {
		type: String,
		required: true,
	},
});

const location = mongoose.model("location", locationSchema);

export { location, locationSchema };
