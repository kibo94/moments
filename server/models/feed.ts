import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a name'],
        },
        body: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        imgUrl: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },


    },
    {
        timestamps: true,
    }
)
// models/user.ts
export const FeedModel = mongoose.model("Feed", FeedSchema);
