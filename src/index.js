import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import { router as userRouter } from "./routes/userRouter.js";
import { router as apiRouter } from "./routes/apiRouter.js";
import { logger } from "./middleware/logger.js";
import { error as error404 } from "./middleware/err-404.js";
import { dirname } from "path";
import * as path from "path";
import { fileURLToPath } from "url";
import mongoose from 'mongoose';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

async function startDB(PORT, MONGO_URL){
    try {
        await mongoose.connect(MONGO_URL);
        app.listen(PORT);
    } catch (e) {
        console.log(e);
    }
}

app.use(express.json());
app.use("/load", express.static(path.join(__dirname, "..", "load")));

app.use(logger);

app.use("/api/books", apiRouter);
app.use("/api/user", userRouter);

app.use(error404);

startDB(PORT, MONGO_URL);
