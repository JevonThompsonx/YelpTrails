import mongoose, { Schema, model } from "mongoose";
import tagTypes from "../models/modelData/tagTypes.js";
import modelsConnectionString from "./modelsConnectionString.js";

await modelsConnectionString();

const tagSchema = new Schema({
    tag: {
        type: String,
        enum: [...tagTypes]
    }
});

const tag = model('tag', tagSchema)
// for (let tagType of tagTypes) { 
//     const newTag = new tag({
//         tag: tagType
//     });
//     await newTag.save()
// }
console.log('Done')
//already seeded 
export { tagSchema,tag}