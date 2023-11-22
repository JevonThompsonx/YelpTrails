import seedConnectionString from './seedConnectionString.js'
import {
    trail
} from '../models/index.js';
import {
    cities
} from './seedData/index.js'

import randNumGen from './seedingFuncs/randNumGen.js'
import getRandOwnerName from './seedingFuncs/getRandOwnerName.js';
import getRandRating from './seedingFuncs/getRandRating.js';
import getRandCampName from './seedingFuncs/getRandCampName.js';
import getFourTags from './seedingFuncs/getFourTags.js';
import getRandUnsplashImage from './seedingFuncs/getRandUnsplashImage.js';

await seedConnectionString();

const deleteCampData = async () => await trail.deleteMany();

const seedCamp = async () => {
    await trail.deleteMany({})
    for (let city of cities) {
        const newCity = new trail({
            name: getRandCampName(),
            price: randNumGen(100),
            owner: getRandOwnerName(),
            rating: getRandRating(),
            tags: [...getFourTags()],
            location: city,
            photoUrl: await getRandUnsplashImage()
        })
        await newCity.save();
    }

}


const randImageSeed = async () => {
    const allTrails = await trail.find()

    for (let singleTrail of allTrails) {

        await trail.updateOne({
            _id: singleTrail._id
        }, {
            photoUrl: await getRandUnsplashImage()
        })
        console.log('updated')
    }
    console.log('done')
}


// await deleteAllCampData()
// await seedCamp()
await randImageSeed();



// console.log(await trail.find({})
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
// )