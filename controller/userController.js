import axios from "axios";

export const topTracks = async (req, res) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
            headers: {
                Authorization: `Bearer ${req.token}`,
            },
            params: {
                limit: 10,
            },
        });

        res.json(response.data);
    } catch (error) {
        // console.error("Error fetching top tracks:", error);
        res.status(500).json({ error: "Failed to fetch top tracks" });
    }
};


export const currentPlayingSong = async (req, res) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
            headers: {
                Authorization: `Bearer ${req.token}`,
            },
        });

        res.json(response.data);
    } catch (error) {
        // console.error("Error fetching current playing song:", error);
        res.status(500).json({ error: "Failed to fetch current playing song" });
    }
};

export const pauseSong = async (req, res) => {
    try {
        const response = await axios.put("https://api.spotify.com/v1/me/player/pause", {
            headers: {
                Authorization: `Bearer ${req.token}`,
            },
        });

        res.json(response.data);
    } catch (error) {
        // console.error("Error pausing song:", error);
        res.status(500).json({ error: "Failed to pause song" });
    }
};

export const playSong = async (req, res) => {
    try {
        const response = await axios.put("https://api.spotify.com/v1/me/player/play", {
            headers: {
                Authorization: `Bearer ${req.token}`,
            },
            data: JSON.stringify({
                uris: [req.body.uri],
                device_id: req.body.device_id
            })
        });

        res.json(response.data);
    } catch (error) {
        // console.error("Error playing song:", error);
        res.status(500).json({ error: "Failed to play song" });
    }
};

export const devices = async (req, res) => {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/player/devices", {
            headers: {
                Authorization: `Bearer ${req.token}`,
            },
        });

        res.json(response.data);
    } catch (error) {
        // console.error("Error fetching devices:", error);
        res.status(500).json({ error: "Failed to fetch devices" });
    }
};
    