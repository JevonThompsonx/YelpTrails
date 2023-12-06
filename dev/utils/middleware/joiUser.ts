import { joiUserSchema } from "../../models/index.js";
import { Request, Response, NextFunction } from "express";
import AppError from "../AppError.js";

export default (req: Request, res: Response, next: NextFunction) => {
	const { User } = req.body,
		error = joiUserSchema.validate(User);
	if (error) {
		next(new AppError(400, "Invalid User structure. Please try again"));
	} else {
		next();
	}
};
