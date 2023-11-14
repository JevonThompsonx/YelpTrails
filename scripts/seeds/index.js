import seedConnectionString from './seedConnectionString.js';
import { trail } from '../models/index.js';
await seedConnectionString();
import 'dotenv/config';
const randomNumberGenerator = (max) => Math.floor(Math.random() * max);
import { descriptors, places, ratings, tagTypes, cities } from './seedData/index.js';
const getCampName = () => {
    const descriptorArrayLength = descriptors.length;
    const randomDescriptor = descriptors[randomNumberGenerator(descriptorArrayLength)];
    const placesArrayLength = places.length;
    const randomPlace = places[randomNumberGenerator(placesArrayLength)];
    return `${randomDescriptor} ${randomPlace} `;
};
import Chance from 'chance';
const chance = new Chance();
const getOwnerName = () => chance.name();
const getRandomRating = () => {
    return ratings[randomNumberGenerator(ratings.length)];
};
const getRandomTag = () => {
    return tagTypes[randomNumberGenerator(tagTypes.length)];
};
const getFiveTags = () => {
    let tempTagArray = ['Empty'];
    for (let i = 0; tempTagArray.length < 6; i++) {
        let newTag = getRandomTag();
        if (tempTagArray.includes(newTag)) {
        }
        else {
            tempTagArray.push(newTag);
        }
    }
    tempTagArray.shift();
    return tempTagArray;
};
const seedCamp = async () => {
    await trail.deleteMany({});
    for (let city of cities) {
        const newCity = new trail({
            name: getCampName(),
            price: randomNumberGenerator(100),
            owner: getOwnerName(),
            rating: getRandomRating(),
            tags: [...getFiveTags()],
            location: city
        });
        //@ts-ignore
        await newCity.save();
    }
};
const deleteCampData = async () => await trail.deleteMany();
// await deleteCampData()
await seedCamp();
console.log(await trail.find({})
    //@ts-ignore
    .then(data => console.log(data))
    //@ts-ignore
    .catch(err => console.log(err)));
