import { joiCommentSchema } from "../../models/index.js";
import AppError from "../AppError.js";
export default (req, res, next) => {
    const { comment } = req.body, error = joiCommentSchema.validate(comment);
    if (error) {
        next(new AppError(400, "Invalid comment structure. Please try again"));
    }
    else {
        next();
    }
};
