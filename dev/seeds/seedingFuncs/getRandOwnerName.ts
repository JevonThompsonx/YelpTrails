import Chance from "chance";
const chance = new Chance();
export default (): String => chance.name();
