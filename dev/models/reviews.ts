import Joi from "joi";
import mongoose, { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId,
	reviewSchema = new Schema({
		body: {
			type: String,
		},
		rating: {
			type: [Number, "Cannot post a review with no rating"],
		},
	
	});

const joiReviewSchema = Joi.object({
	body: Joi.string(),
	rating: Joi.number().required(),
});

export { reviewSchema, joiReviewSchema };
