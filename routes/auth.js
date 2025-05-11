import express from "express";
import { spotifyAuth, spotifyCallback, logout, tokenCb } from "../controller/authController.js";
// import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

router.get("/spotify", spotifyAuth);
router.get("/spotify/callback", spotifyCallback);
// router.get("/token", authenticateUser, tokenCb);
router.post("/logout", logout);

export default router;