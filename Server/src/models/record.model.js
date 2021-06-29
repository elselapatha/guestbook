import { Schema, model } from 'mongoose';

const Record = new Schema(
  {
    message: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      index: true,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Record', Record);
