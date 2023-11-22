import randNumGen from './randNumGen.js';
import ratings from '../seedData/ratings.js';
export default () => {
    return ratings[randNumGen(ratings.length)];
};
