import { Schema, model } from "mongoose";

interface UserData {
  username: string,
  email: string,
  hash: string,
  salt: string,
  resetPasswordToken: string | null,
  resetPasswordExpires: string | null
}

const userSchema = new Schema<any, UserData>({
  username: {
    type: String,
    unique: [true, "Username must be unique."],
    required: [true, "Username is required"],
    lowercase: [true]
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: [true, "Email must be unique."],
    index: [true],
    sparse: [true],
    lowercase: [true],
  },
  hash: {
    type: String,
    required: [true, "Password Hash is required."]
  },
  salt: {
    type: String,
    required: [true, "Password Salt is required."],
    min: 10
  },
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  }
});

const User = model("User", userSchema);

export default User;
