import mongoose from 'mongoose'
import seedConnectionString from './seedConnectionString.js'
import {
    trail
} from '../models/index.js';

import photo from '../models/photos.js';

await seedConnectionString();
import 'dotenv/config';

const randomNumberGenerator = (max: number): number => Math.floor(Math.random() * max);

import {
    descriptors,
    places,
    ratings,
    tagTypes,
    cities
} from './seedData/index.js'

const getCampName = (): string => {
    const descriptorArrayLength = descriptors.length
    const randomDescriptor = descriptors[randomNumberGenerator(descriptorArrayLength)]
    const placesArrayLength = places.length
    const randomPlace = places[randomNumberGenerator(placesArrayLength)]
    return `${randomDescriptor} ${randomPlace} `
}

import Chance from 'chance';
const chance = new Chance();
const getOwnerName = (): String => chance.name()

const getRandomRating = (): String => {
    return ratings[randomNumberGenerator(ratings.length)]
}

const getRandomTag = (): String => {
    return tagTypes[randomNumberGenerator(tagTypes.length)]
}

const getFourTags = (): [String] => {
    let tempTagArray: [String] = ['Empty'];

    for (let i = 0; tempTagArray.length < 5; i++) {
        let newTag = getRandomTag();
        if (tempTagArray.includes(newTag)) {} else {
            tempTagArray.push(newTag)
        }
    }
    tempTagArray.shift();

    return tempTagArray
}



const randomUnsplashImage = async ()=> {
    const photoObjectResults = await photo.find(),
    allLinks = []
    for (const singlePhoto of photoObjectResults) {
        allLinks.push(singlePhoto.link)
    }
    return allLinks[randomNumberGenerator(allLinks.length)]
}


const seedCamp = async () => {
    await trail.deleteMany({})
    for (let city of cities) {
        const newCity: object = new trail({
            name: getCampName(),
            price: randomNumberGenerator(100),
            owner: getOwnerName(),
            rating: getRandomRating(),
            tags: [...getFourTags()],
            location: city,
            photoUrl: await randomUnsplashImage()
        })
        //@ts-ignore
        await newCity.save();
    }

}


const reSeedCamp = async () => {
    const allTrails = await trail.find()

    for (let singleTrail of allTrails) {
        if (singleTrail.photoUrl === 'https://images.unsplash.com/photo-1574009709841-7e4781f5afef?ixid=M3w1MjEzNzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDA1MjAyMjB8&ixlib=rb-4.0.3' || singleTrail.photoUrl === 'https://images.unsplash.com/photo-1465311354905-789ff5f7a457?ixid=M3w1MjEzNzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDA1MTU2MTR8&ixlib=rb-4.0.3' || singleTrail.photoUrl === 'https://images.unsplash.com/photo-1465188035480-cf3a60801ea5?ixid=M3w1MjEzNzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDA1MTU2MTh8&ixlib=rb-4.0.3' ){
           await trail.updateOne({
                    _id: singleTrail._id
                }, {
                    photoUrl: await randomUnsplashImage()
                })
        console.log('updated')
    }
        }
  console.log('done')
}



const deleteCampData = async () => await trail.deleteMany();


// await deleteCampData()
// await seedCamp()
await reSeedCamp();



// console.log(await trail.find({})
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
// )