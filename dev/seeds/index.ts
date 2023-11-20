import mongoose from 'mongoose'
import seedConnectionString from './seedConnectionString.js'
import unsplash from './unsplash.js'
import {
    trail,
    trailSchema,
    location
} from '../models/index.js';


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

const getFiveTags = (): [String] => {
    let tempTagArray: [String] = ['Empty'];

    for (let i = 0; tempTagArray.length < 6; i++) {
        let newTag = getRandomTag();
        if (tempTagArray.includes(newTag)) {} else {
            tempTagArray.push(newTag)
        }
    }
    tempTagArray.shift();

    return tempTagArray
}
const getPhotoFunc = async () => {
    try {
        return await unsplash();
    } catch {}
}
const seedCamp = async () => {
    await trail.deleteMany({})
    for (let city of cities) {
        const newCity: object = new trail({
            name: getCampName(),
            price: randomNumberGenerator(100),
            owner: getOwnerName(),
            rating: getRandomRating(),
            tags: [...getFiveTags()],
            location: city,
            photoUrl: await getPhotoFunc()
        })
        //@ts-ignore
        await newCity.save();
    }

}

const reSeedCamp = async () => {
    const allTrails = await trail.find()
    for (let singleTrail of allTrails) {
        try {
            if (singleTrail.photoUrl === 'https://images.unsplash.com/photo-1459231978203-b7d0c47a2cb7?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') {
                await trail.updateOne({
                    _id: singleTrail._id
                }, {
                    photoUrl: unsplash()
                })
                console.log('updated')
            } else {

            }
        } catch {
            console.log('Unsplash Prob done for the day')
        }

    }
}


const deleteCampData = async () => await trail.deleteMany();


// await deleteCampData()
// await seedCamp()
await reSeedCamp();

console.log(await unsplash().then(data => data).catch(err => err))
console.log(await trail.find({})
    //@ts-ignore
    .then(data => console.log(data))
    //@ts-ignore
    .catch(err => console.log(err))
)