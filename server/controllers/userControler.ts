import { type Request, type Response } from "express";
import { UserModel, type LoginInput, type UserInput } from "../models/user.ts";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { requireJwtSecret } from "../config/jwt.ts";
import asyncHandler from "express-async-handler";

const userSchema = Joi.object<UserInput>({
    name: Joi.string().optional(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(3).required(),
});
const registerSchema = userSchema.keys({
    name: Joi.string().required(),
});



interface AuthenticatedRequest extends Request {
    user?: { id?: string };
}

const getUsers = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const users = await UserModel.find({}).select("-password -token");
    res.json(users);
});

const registerUser = asyncHandler(async (req: Request<object, object, UserInput>, res: Response): Promise<void> => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0]?.message);
        return;
    }

    const { name, email, password } = value;
    if (!name) {
        res.status(400).send("Please add a name");
        return;
    }

    const existingUser = await UserModel.exists({ email });
    if (existingUser) {
        res.status(409).send("Email already registered");
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
        name, email, password: hashedPassword
    });

    res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
    });
});

const getMe = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const user = await UserModel.findById(req.user?.id).select("-password -token");
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
    });
});


const login = asyncHandler(async (req: Request<object, object, LoginInput>, res: Response): Promise<void> => {
    const { error } = userSchema.validate(req.body);
    const { email, password } = req.body

    if (error) {
        res.status(400).send(error.details[0]?.message);
        return;
    }

    const user = await UserModel.findOne({ email })
    if (!user) {
        res.status(400).send("Invalid email or password");
        return;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        res.status(400).send("Invalid email or password");
        return;
    }

    const token = jwt.sign({ id: user._id }, requireJwtSecret(), { expiresIn: "30d" });

    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
});

export {
    getUsers,
    registerUser,
    getMe,
    login
}
