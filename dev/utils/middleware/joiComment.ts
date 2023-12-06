import { joiCommentSchema } from "../../models/index.js";
import { Request, Response, NextFunction } from "express";
import AppError from "../AppError.js";

export default (req: Request, res: Response, next: NextFunction) => {
	const { comment } = req.body,
		error = joiCommentSchema.validate(comment);
	if (error) {
		next(new AppError(400, "Invalid comment structure. Please try again"));
	} else {
		next();
	}
};
