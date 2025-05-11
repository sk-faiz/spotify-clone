import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = "http://localhost:4040/auth/spotify/callback";

// Redirect to Spotify login
export const spotifyAuth = (req, res) => {
    const scope = encodeURIComponent("user-read-private user-top-read user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing streaming");
    const url = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&scope=${scope}`;

    res.redirect(url);
};

// Handle callback from Spotify
export const spotifyCallback = async (req, res) => {
    const code = req.query.code;
    if (!code) return res.status(400).json({ error: "Authorization code missing" });

    try {
        const tokenResponse = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
                code,
                redirect_uri: SPOTIFY_REDIRECT_URI,
                grant_type: "authorization_code",
            }),
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        const { access_token } = tokenResponse.data;
        console.log(access_token)
        const userResponse = await axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const { id, display_name, email, images } = userResponse.data;

        let user = await User.findOne({ spotifyId: id });

        if (!user) {
            user = await User.create({
                spotifyId: id,
                displayName: display_name,
                email: email,
                profilePic: images[0]?.url
            });
        }

        const token = jwt.sign({ userId: user._id, sToken: access_token }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, { httpOnly: true });

        res.redirect(CLIENT_URL);
    } catch (error) {
        console.error("Spotify Callback Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Authentication failed" });
    }
};

// 🔥 Endpoint to get the authentication token
export const tokenCb = async (req, res) => {
    const accessToken = req.token
    // console.log(accessToken)
    if (!accessToken) {
        return res.status(401).json({ error: "Unauthorized, login required" });
    }
    res.json({ access_token: accessToken });
};

// Logout
export const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
};