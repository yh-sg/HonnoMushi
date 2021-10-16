import express, {Request, Response} from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import BookRoute from './routes/booksRoute';
import UserRoute from './routes/authRoute';
import errorHandler from "./middleWares/error";

dotenv.config();

const app = express(),
    PORT = process.env.PORT || 3010;

//connection
mongoose.connect(
    process.env.MOGODBCLOUD as string,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }).then(() => {
        app.listen(PORT, () => {
            console.log(`App is listening on PORT ${PORT} at ${new Date()}`);
            console.log("Mongodb connected!");
        });
    }).catch((e:Error) => console.error(e));

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

// test in Heroku
app.get('/', (req:Request, res:Response):void => {
    res.status(200);
    res.send("Hello!");
});

app.use('/', BookRoute);
app.use('/auth', UserRoute);

app.use(errorHandler);