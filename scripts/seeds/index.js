import seedConnectionString from './seedConnectionString.js';
import { trail } from '../models/index.js';
import { cities } from './seedData/index.js';
import randNumGen from './seedingFuncs/randNumGen.js';
import getRandOwnerName from './seedingFuncs/getRandOwnerName.js';
import getRandRating from './seedingFuncs/getRandRating.js';
import getRandCampName from './seedingFuncs/getRandCampName.js';
import getFourTags from './seedingFuncs/getFourTags.js';
import getRandUnsplashImage from './seedingFuncs/getRandUnsplashImage.js';
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
            photoUrl: await getRandUnsplashImage()
        });
        await newCity.save();
    }
};
const reSeedCamp = async () => {
    const allTrails = await trail.find();
    for (let singleTrail of allTrails) {
        if (singleTrail.photoUrl === 'https://images.unsplash.com/photo-1574009709841-7e4781f5afef?ixid=M3w1MjEzNzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDA1MjAyMjB8&ixlib=rb-4.0.3' || singleTrail.photoUrl === 'https://images.unsplash.com/photo-1465311354905-789ff5f7a457?ixid=M3w1MjEzNzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDA1MTU2MTR8&ixlib=rb-4.0.3' || singleTrail.photoUrl === 'https://images.unsplash.com/photo-1465188035480-cf3a60801ea5?ixid=M3w1MjEzNzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDA1MTU2MTh8&ixlib=rb-4.0.3') {
            await trail.updateOne({
                _id: singleTrail._id
            }, {
                photoUrl: await getRandUnsplashImage()
            });
            console.log('updated');
        }
    }
    console.log('done');
};
await reSeedCamp();
