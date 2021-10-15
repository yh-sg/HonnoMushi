import { Schema, model, Document } from 'mongoose';

interface User extends Document {
    name: string;
    email: string;
    password: string;
  }

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //!img: {type: String} future add-on
});

const User = model<User>('User', userSchema);

export default User;