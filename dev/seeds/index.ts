import seedConnectionString from "./seedConnectionString.js";
import { trail } from "../models/index.js";
import { cities } from "./seedData/index.js";

import randNumGen from "./seedingUtils/randNumGen.js";
import getRandOwnerName from "./seedingUtils/getRandOwnerName.js";
import getRandRating from "./seedingUtils/getRandRating.js";
import getRandCampName from "./seedingUtils/getRandCampName.js";
import getFourTags from "./seedingUtils/getFourTags.js";
import getRandUnsplashImage from "./seedingUtils/getRandUnsplashImage.js";

await seedConnectionString();

const deleteCampData = async () => await trail.deleteMany();

const seedCamp = async () => {
	await trail.deleteMany({});
	for (let city of cities) {
		const newCity = new trail({
			name: getRandCampName(),
			price: randNumGen(100),
			owner: getRandOwnerName(),
			rating: getRandRating(),
			tags: [...getFourTags()],
			location: city,
			photoUrl: await getRandUnsplashImage(),
		});
		await newCity.save();
	}
};

const randImageSeed = async () => {
	const allTrails = await trail.find();

	for (let singleTrail of allTrails) {
		await trail.updateOne(
			{
				_id: singleTrail._id,
			},
			{
				photoUrl: await getRandUnsplashImage(),
			}
		);
		console.log("updated");
	}
	console.log("done");
};

// await deleteAllCampData()
// await seedCamp()
await randImageSeed();

// console.log(await trail.find({})
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
// )
