import { Schema, model } from 'mongoose';

const User = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('User', User);
