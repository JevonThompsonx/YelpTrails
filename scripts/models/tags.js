import { Schema, model } from "mongoose";
import tagTypes from "../models/modelData/tagTypes.js";
import modelsConnectionString from "./modelsConnectionString.js";
await modelsConnectionString();
const tagSchema = new Schema({
    tag: {
        type: String,
        enum: [...tagTypes]
    }
});
const tag = model('tag', tagSchema);
console.log('Done');
export { tagSchema, tag };
