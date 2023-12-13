import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { route404Hanlder } from "./middlewares/route404Hanlder";
import { expressErrorHandler } from "./middlewares/expressErrorHandler";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors'
import compression  from 'compression'
import { mountedRoutes } from "./routes";

//Configs
dotenv.config({ path: "./config.env" });
const NODE_ENV = process.env.NODE_ENV as string;
const DB_URI = process.env.DB_URI as string;
const PORT = Number(process.env.PORT);
const BASE_PATH = process.env.BASE_PATH as string;

//Create app
const app = express();

//allow other domains to access the api
app.use(cors())
app.options('*', cors())

//compress the api response
app.use(compression())

//allow static files
app.use(express.static(path.join(__dirname, "uploads")));

//ConnectDB
connectDB(DB_URI);

//Middlewares
app.use(express.json());
// app.use(uploadProgressMiddleware)
if (NODE_ENV.startsWith("DEV")) {
    app.use(morgan("dev"));
    console.log(`Mode == ${NODE_ENV}`);
} else {
    console.log(`Mode == ${NODE_ENV}`);
}

//Routes
mountedRoutes(app, BASE_PATH);

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
