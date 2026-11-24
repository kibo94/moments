import type { User } from "../models/user.ts";

export const users: User[] = [];

import mongoose from "mongoose"



// Replace with your MongoDB Compass URI + your database name
const mongoURI = 'mongodb://127.0.0.1:27017/social-app';

export async function connectDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB via Mongoose!');
    } catch (err) {
        console.error('Connection error:', err);
    }
}

connectDB();
