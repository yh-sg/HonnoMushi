import express, {NextFunction, Request, Response} from "express";
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { HttpStatusCode } from "../utils/constants";
import ErrorResponse from "../utils/expressErrorResponse";

const router = express.Router();

router.post("/login", async (req:Request, res:Response, next:NextFunction):Promise<Response|void>=> {
    //email, password from frontend
    //frontend form, hope to add react-dropzone
    const { email, password } = req.body;

    try {
        //Check email
        const existingUser = await User.findOne({ email });

        if (!existingUser) return next(new ErrorResponse("User does not exist",HttpStatusCode.NOT_FOUND))

        //Check password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return next(new ErrorResponse("Wrong password!",HttpStatusCode.NOT_FOUND))

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET as string, { expiresIn: '30m' });

        return res.status(HttpStatusCode.OK).json({ result: existingUser, token });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post("/register", async (req:Request, res:Response, next:NextFunction):Promise<Response|void> => {
    //frontend form
    const { name, email, password, confirmPassword } = req.body;

    try {
        //Check if email exist or not
        const existingUser = await User.findOne({ email });

        if (existingUser) return next(new ErrorResponse("Email already exist!",HttpStatusCode.BAD_REQUEST));

        //Compare pw
        if (password !== confirmPassword) return next(new ErrorResponse("Password doesn't match!",HttpStatusCode.BAD_REQUEST))

        //Hashing^^
        const hashedPassword:string = await bcrypt.hash(password, 10),
            result = await User.create({ email, password: hashedPassword, name }),
            token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET as string, { expiresIn: '1h' });

        return res.status(HttpStatusCode.OK).json({ result, token });
    } catch (e) {
        console.error(e);
        next(e)
    }
});

export default router;