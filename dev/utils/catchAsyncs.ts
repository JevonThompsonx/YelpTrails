import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";

export default (
	fn: (req: Request, res: Response, next: NextFunction) => any
) => {
	return function (req: Request, res: Response, next: NextFunction) {
		fn(req, res, next).catch((e: AppError) => next(e));
	};
};
