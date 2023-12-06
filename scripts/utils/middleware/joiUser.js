import { joiUserSchema } from "../../models/index.js";
import AppError from "../AppError.js";
export default (req, res, next) => {
    const { User } = req.body, error = joiUserSchema.validate(User);
    if (error) {
        next(new AppError(400, "Invalid User structure. Please try again"));
    }
    else {
        next();
    }
};
