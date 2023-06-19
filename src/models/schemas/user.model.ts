import {Schema, model} from "mongoose";

interface IUser {
    username: string;
    password: string;
}

const schemaUser = new Schema<IUser>({
    username: String,
    password: String
});

const UserModel = model<IUser>('User', schemaUser);

export {UserModel};