import express from "express";
import { login } from "../controllers/userControler.ts";


const router = express.Router();

router.post("/login", login);
router.post("/", login);

export default router;
