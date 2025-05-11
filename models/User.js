import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    spotifyId: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);