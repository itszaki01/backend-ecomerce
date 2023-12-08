import fs from "fs";
import "colors";
import dotenv from "dotenv";
import { connectDB } from "../../config/db";
import { Review } from "../../models/ReviewModal";


dotenv.config({ path: '../../config.env' });
const DB_URI = process.env.DB_URI as string;

// connect to DB
connectDB(DB_URI);

// Read data
const reviews = JSON.parse(fs.readFileSync("./reviews.json", "utf8"));

// Insert data into DB
const insertData = async () => {
    try {
        await Review.create(reviews);

        console.log("Data Inserted".green.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// Delete data from DB
const destroyData = async () => {
    try {
        await Review.deleteMany();
        console.log("Data Destroyed".red.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// node seeder.js -d
if (process.argv[2] === "-i") {
    insertData();
} else if (process.argv[2] === "-d") {
    destroyData();
}
