import express, { type Request, type Response } from "express";
import cors from "cors";
import usersRouter from "./routes/users.ts";
import authRouter from "./routes/auth.ts";
import { connectDB } from "./db/db.ts";
import dotenv from "dotenv";
import { FeedModel } from "./models/feed.ts";
dotenv.config();

connectDB()

const app = express();
const port = 3000;


interface Post {
    id: string
    title: string
    body: string,
    imageUrl: string
}

interface CreateFeedInput {
    title: string;
    body: string;
    imgUrl: string;
}


const posts: Post[] = [
    // {
    //     id: uuid(),
    //     title: "Mountain escape",
    //     body: "Fresh air and a beautiful view from the trail.",
    //     imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",

    // },
    // {
    //     id: uuid(),
    //     title: "Coffee break",
    //     body: "Taking a moment to slow down and recharge.",
    //     imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",

    // },
    // {
    //     id: uuid(),
    //     title: "By the ocean",
    //     body: "A little sunshine and the sound of the waves.",
    //     imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",

    // }
]



app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use("/users", usersRouter);

app.use("/auth", authRouter);

app.post("/feeds", async (req: Request<object, unknown, CreateFeedInput>, res: Response): Promise<void> => {
    const { title, body, imgUrl } = req.body ?? {};
    if (
        typeof title !== "string" || !title.trim() ||
        typeof body !== "string" || !body.trim() ||
        typeof imgUrl !== "string" || !imgUrl.trim()
    ) {
        res.status(400).json({ message: "title, body, and imgUrl are required" });
        return;
    }

    try {
        const feed = await FeedModel.create({
            title: title.trim(),
            body: body.trim(),
            imgUrl: imgUrl.trim(),
        });
        res.status(201).json(feed);
    } catch (error) {
        console.error("Failed to create feed:", error);
        res.status(500).json({ message: "Failed to create feed" });
    }
})
app.get("/feeds", async (_req: Request, res: Response) => {
    try {
        const feeds = await FeedModel.find({})
        res.json(feeds)
    } catch (error) {

    }

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})