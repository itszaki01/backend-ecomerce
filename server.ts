import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { CategoryRouter } from "./routes/CategoryRoute";
import { route404Hanlder } from "./middlewares/route404Hanlder";
import { expressErrorHandler } from "./middlewares/expressErrorHandler";
import dotenv from "dotenv";
import { SubCategoryRoute } from "./routes/SubCategoryRoute";
import { BrandRoute } from "./routes/BrandRoute";
import { ProductRoute } from "./routes/ProductRoute";

//Configs
dotenv.config({ path: "./config.env" });
const NODE_ENV = process.env.NODE_ENV as string;
const DB_URI = process.env.DB_URI as string;
const PORT = Number(process.env.PORT);
const BASE_PATH = process.env.BASE_PATH as string;

//Create app
const app = express();

//ConnectDB
connectDB(DB_URI);

//Middlewares
app.use(express.json());
if (NODE_ENV.startsWith("DEV")) {
    app.use(morgan("dev"));
    console.log(`Mode == ${NODE_ENV}`);
} else {
    console.log(`Mode == ${NODE_ENV}`);
}

//Routes
app.use(`${BASE_PATH}/categories`, CategoryRouter);
app.use(`${BASE_PATH}/subcategories`, SubCategoryRoute);
app.use(`${BASE_PATH}/brands`, BrandRoute);
app.use(`${BASE_PATH}/products`, ProductRoute);



//Express Error Hanlders
app.all("*", route404Hanlder);
app.use(expressErrorHandler);

//Server Listner
const server = app.listen(PORT, () => {
    console.log("Server is Running on port ", PORT);
});

//Rejection Handler
process.on("unhandledRejection", (err: Error) => {
    console.log(
        `\n -----------------------------------------
        \n => Unhandled Error: ${err}
        \n -----------------------------------------
        \n => Message: ${err.message}
        \n -----------------------------------------
        \n => Stack ${err.stack}
        \n -----------------------------------------`
    );
    server.close(() => {
        console.log("Server Shutdown...");
        process.exit(1);
    });
});
