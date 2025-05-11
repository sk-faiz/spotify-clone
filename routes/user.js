import express from "express";
import { topTracks, currentPlayingSong, devices, playSong, pauseSong } from "../controller/userController.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

router.get("/top-tracks", authenticateUser, topTracks);
router.get("/current-playing-song", authenticateUser, currentPlayingSong);
router.get("/devices", authenticateUser, devices);
router.put("/play", authenticateUser, playSong);
router.put("/pause", authenticateUser, pauseSong);

export default router;