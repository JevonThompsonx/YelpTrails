import { joiTrailSchema } from "../../models/index.js";
import { Request, Response, NextFunction } from "express";
import AppError from "../AppError.js";

export default (req: Request, res: Response, next: NextFunction) => {
	const selectedTags = [];
	for (let potentialTag in req.body) {
		if (req.body[`${potentialTag}`] === "on") {
			selectedTags.push(potentialTag);
		} else {
		}
	}

	const { name, price, city, state } = req.body,
		validationObject = {
			name: name,
			price: price,
			city: city,
			state: state,
			tags: [...selectedTags],
		},
		{ error } = joiTrailSchema.validate(validationObject);

	if (error) {
		const msg = error.details.map((element) => element.message).join(",");
		next(new AppError(400, msg));
	} else {
		next();
	}
};
