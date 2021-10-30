import { Schema, model, Document } from 'mongoose';

enum UserPrivilege{
  ADMIN="Admin",
  USER="User"
}

export interface IUser extends Document {
    name?: string;
    email: string;
    password: string;
    userPrivilege?: UserPrivilege
  }

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userPrivilege: {type: String, enum:Object.values(UserPrivilege) , default: UserPrivilege.USER}
    //!img: {type: String} future add-on
});

const User = model<IUser>('User', userSchema);

export default User;