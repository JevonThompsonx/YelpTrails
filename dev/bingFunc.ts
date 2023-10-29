import axios from 'axios';
import { configDotenv } from 'dotenv';
import 'dotenv/config'
configDotenv({path: '../.env'})
const BING_KEY = process.env.BING_KEY

const validLinks:String[] = []
const bingFunc = async (search:String) =>{
  
  let rawData:any = await axios.get(
     'https://api.bing.microsoft.com/v7.0/images/search',
  {
    params: {
    q: `${search}`,
    safeSearch: 'Strict',
    license: 'Public',
    count: 5
  },
    headers: { 'Ocp-Apim-Subscription-Key': BING_KEY }
  }
  )
  for (let individualData of rawData.data) {
    console.log(individualData)
  //   await axios.get(individualData.thumbnail) 
  //   .then ( ()=> {
  //    validLinks.push(individualData.thumbnail)
  //     }
  //   )
  //   .catch(function (error) {
  //     if (error.response) {
  //       console.log('error. Request out of 200 range')
  //     } 
  //         else if (error.request) { 
  //           console.log('error. No response')
  //         }
  //     else {
  //       console.log('error. set up for request failed')
  //     }
  //   }
  //   )

  //   } 

  // return validLinks
}

}
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


const getRandomInt = (max:number):number => {
  return Math.floor(Math.random() * 33);
}
console.log(await bingFunc('hiking trails'))
// export {bingFunc, searchTerms,getRandomInt}