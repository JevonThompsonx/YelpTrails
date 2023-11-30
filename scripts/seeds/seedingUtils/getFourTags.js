import { tag } from "../../models/index.js";
import randNumGen from "./randNumGen.js";
import seedFuncsConnectionString from "./seedFuncsConnectionString.js";
await seedFuncsConnectionString();
const tagTypes = await tag.find();
const getRandTag = () => {
    return tagTypes[randNumGen(tagTypes.length)].tag;
};
export default async () => {
    let tempTagArray = [];
    for (let i = 0; tempTagArray.length < 4; i++) {
        let newTag = await getRandTag();
        if (tempTagArray.includes(newTag)) {
        }
        else {
            tempTagArray.push(newTag);
        }
    }
    return tempTagArray;
};
