import mongoose from "mongoose";
import {Express} from "express";
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 3010;

const connection = (app:Express) => mongoose.connect(
    process.env.MOGODBCLOUD as string,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }).then(() => {
        app.listen(PORT, async() => {
            console.log(`App is listening on PORT ${PORT} at ${new Date()}`);
            console.log("Mongodb connected!");
        });
}).catch((e:Error) => console.error(e));

export default connection;