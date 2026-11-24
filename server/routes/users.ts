
import express, { type Request, type Response } from "express";
import auth from "../middleware/auth.ts";
import { getMe, getUsers, registerUser } from "../controllers/userControler.ts";
import type { User } from "../models/user.ts";

const router = express.Router();

// korisnik bez lozinke, to je jedino što sme da ode klijentu
type PublicUser = Omit<User, "password">;

const toPublic = ({ password: _password, ...rest }: User): PublicUser => rest;

router.get("/", auth, getUsers);

router.get("/", auth, (_req: Request, res: Response): void => {
    res.json(toPublic);
});

router.post("/", registerUser);

router.get("/me", auth, getMe);

export default router;
