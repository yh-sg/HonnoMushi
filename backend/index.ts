import express, {Request, Response} from "express";
import morgan from "morgan";
import cors from "cors";
import BookRoute from './routes/booksRoute';
import UserRoute from './routes/authRoute';
import errorHandler from "./middleWares/error";
import connection from "./config/dbConfig";
import Books from "./models/booksModel";
import { HttpStatusCode } from "./utils/constants";
import ErrorResponse from "./utils/expressErrorResponse";

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

connection(app);

// test in Heroku
app.get('/', (req:Request, res:Response):void => {
    res.status(200);
    res.send("Hello!");
});

app.get('/booktest', async (req:Request, res:Response, next):Promise<void> => {
        try {
            const total = await Books.find().countDocuments(),
                books = await Books.find();
            res.status(HttpStatusCode.OK).send({
                count: total,
                booksLetter: books,
            });
        } catch (e) {
            console.error(e);
        }
});

app.use('/', BookRoute);
app.use('/auth', UserRoute);

app.use(errorHandler);

export default app;