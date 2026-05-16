import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, minLength: 3, required: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, minLength: 8, maxLength: 30 },
});

export const userModel = mongoose.model("User", UserSchema);
