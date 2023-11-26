import { joiCommentSchema } from "../../models/index.js";
import AppError from "../AppError.js";
export default (req, res, next) => {
    const { comment } = req.body, error = joiCommentSchema.validate(comment);
    if (error) {
        next(new AppError("Invalid comment structure. Please try again", 400));
    }
    else {
        next();
    }
};
