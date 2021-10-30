import User, { IUser } from "../models/userModel";
import { HttpStatusCode } from "../utils/constants";
import ErrorResponse from "../utils/expressErrorResponse";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface authForm extends IUser{
    confirmPassword:string
}

export const loginService = async(form:IUser) => {

    //email, password from frontend
    //frontend form, hope to add react-dropzone
    const { email, password } = form;

    //Check email
    const existingUser = await User.findOne({ email });

    if (!existingUser) return new ErrorResponse("User does not exist",HttpStatusCode.NOT_FOUND)

    //Check password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return new ErrorResponse("Wrong password!",HttpStatusCode.UNAUTHORIZED)

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET as string, { expiresIn: '30m' });

    return {existingUser, token}
}

export const signupService = async( form:authForm ) => {
    //frontend form
    const { name, email, password, confirmPassword } = form;

        //Check if email exist or not
        const existingUser = await User.findOne({ email });
    
        if (existingUser) return new ErrorResponse("Email already exist!",HttpStatusCode.BAD_REQUEST);
    
        //Compare pw
        if (password !== confirmPassword) return new ErrorResponse("Password doesn't match!",HttpStatusCode.BAD_REQUEST)
    
        //Hashing^^
        const hashedPassword:string = await bcrypt.hash(password, 10),
            result = await User.create({ email, password: hashedPassword, name }),
            token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET as string, { expiresIn: '1h' });
    
        return {result, token}
}