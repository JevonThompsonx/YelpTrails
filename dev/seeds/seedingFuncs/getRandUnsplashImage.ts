import randNumGen from "./randNumGen.js";
import photo from "../../models/photos.js";

export default async () => {
	const photoObjectResults = await photo.find(),
		allLinks = [];
	for (const singlePhoto of photoObjectResults) {
		allLinks.push(singlePhoto.link);
	}
	return allLinks[randNumGen(allLinks.length)];
};
