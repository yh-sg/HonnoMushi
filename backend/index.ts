import express, {Request, Response} from "express";
import morgan from "morgan";
import cors from "cors";
import BookRoute from './routes/booksRoute';
import UserRoute from './routes/authRoute';
import errorHandler from "./middleWares/error";
import connection from "./config/dbConfig";
import { HttpStatusCode } from "./utils/constants";

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

connection(app);

// test in Heroku
app.get('/', (req:Request, res:Response):void => {
    res.status(HttpStatusCode.OK);
    res.send("Hello!");
});

app.use('/', BookRoute);
app.use('/auth', UserRoute);

app.use(errorHandler);

export default app;