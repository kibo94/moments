import mongoose from "mongoose";


export interface UserInput {
    name?: string;
    email: string;
    password: string;
}
export interface User {
    id: string;
    name?: string;
    email: string;
    password: string;
    token?: string;
}

export interface LoginInput {
    email: string;
    password: string;
}




const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },

        token: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
)
// models/user.ts
export const UserModel = mongoose.model("User", UserSchema);



