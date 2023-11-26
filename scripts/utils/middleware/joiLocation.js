import { joiLocationSchema } from "../../models/index.js";
import AppError from "../AppError.js";
export default (req, res, next) => {
    const { Location } = req.body, error = joiLocationSchema.validate(Location);
    if (error) {
        next(new AppError("Invalid Location structure. Please try again", 400));
    }
    else {
        next();
    }
};
