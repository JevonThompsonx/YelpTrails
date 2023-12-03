import mongoose from "mongoose";
import "dotenv/config";
import { configDotenv } from "dotenv";
configDotenv({ path: "../../.env" });
const API_KEY = process.env.API_KEY;

const connectionString = async () => {
	await mongoose
		.connect(
			`mongodb+srv://Jevonx:${API_KEY}@cluster0.q4o1wzp.mongodb.net/?retryWrites=true&w=majority`,
			{ dbName: "yelpTrails" }
		)
		.then(() => {
			console.log("Connection succesful");
		})
		.catch((err) => {
			console.log(`Connection errrorrrr`);
		});
};
export default connectionString;
