import { joiTrailSchema } from "../../models/index.js";
import AppError from "../AppError.js";
export default (req, res, next) => {
    const selectedTags = [];
    for (let potentialTag in req.body) {
        if (req.body[`${potentialTag}`] === "on") {
            selectedTags.push(potentialTag);
        }
        else {
        }
    }
    const { name, price, city, state } = req.body, validationObject = {
        name: name,
        price: price,
        city: city,
        state: state,
        tags: [...selectedTags],
    }, { error } = joiTrailSchema.validate(validationObject);
    if (error) {
        const msg = error.details.map((element) => element.message).join(",");
        next(new AppError(msg, 400));
    }
    else {
        next();
    }
};
