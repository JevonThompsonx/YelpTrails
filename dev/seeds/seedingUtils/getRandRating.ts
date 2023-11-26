import randNumGen from "./randNumGen.js";
import ratings from "../seedData/ratings.js";

export default (): String => {
	return ratings[randNumGen(ratings.length)];
};
