import { Types } from 'mongoose';
import Record from '../models/record.model';

export default class RecordService {
  async getRecords(user) {
    const records = await Record.find({
      user: Types.ObjectId(user),
    })
      .select({ _id: 1, message: 1, createdAt: 1 })
      .lean();

    return records;
  }

  async postRecord(message, user) {
    const record = new Record({ message, user });
    return await record.save();
  }

  async updateRecord(id, message) {
    const record = await Record.findByIdAndUpdate(
      id,
      { $set: { message } },
      { new: true }
    );
    if (record) {
      return record;
    } else throw new Error('Record not available!');
  }

  async deleteRecord(id) {
    const record = await Record.findByIdAndDelete(id);
    if (record) {
      return true;
    } else throw new Error('Record not available!');
  }
}
