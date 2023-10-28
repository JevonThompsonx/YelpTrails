import axios from 'axios';
import { configDotenv } from 'dotenv';
import 'dotenv/config';
configDotenv({ path: '../.env' });
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;
const unsplashFunc = async (search) => {
    const splashData = await axios.get(`https://api.unsplash.com/photos`, { params: {
            query: search
        },
        headers: {
            'Authorization': `Client-ID ${UNSPLASH_KEY}`,
            'Accept-Version': 'v1',
            'count': 30
        }
    });
    return splashData;
};
const searchTerms = [
    "mountain landscape",
    "forest trail",
    "hiking adventure",
    "wilderness scenery",
    "riverbank view",
    "sunrise over hills",
    "nature exploration",
    "backcountry trek",
    "lake in the woods",
    "sunset on the trail",
    "rocky terrain",
    "waterfall beauty",
    "trailhead marker",
    "wildlife encounter",
    "campsite serenity",
    "wildflower meadow",
    "ridge line panorama",
    "footbridge crossing",
    "canyon vista",
    "hiker's perspective",
    "outdoor solitude",
    "valley landscape",
    "lush greenery",
    "summit achievement",
    "hiking gear close-up",
    "birdwatching spot",
    "geological wonder",
    "adventurous backpacker",
    "clear sky camping",
    "winding forest path",
    "wilderness serenade",
    "remote trailhead",
    "vivid autumn foliage"
];
const getRandomInt = (max) => {
    return Math.floor(Math.random() * 33);
};
export { unsplashFunc, searchTerms, getRandomInt };
