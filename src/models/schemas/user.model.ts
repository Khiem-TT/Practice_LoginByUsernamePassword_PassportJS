import {Schema, model} from "mongoose";

interface IUser {
    username: string;
    password: string;
    google: {
        id: {
            type: string
        }
    }
}

const schemaUser = new Schema<IUser>({
    username: String,
    password: String,
    google: {
        id: {
            type: String
        }
    }
});

const UserModel = model<IUser>('User', schemaUser);

export {UserModel};