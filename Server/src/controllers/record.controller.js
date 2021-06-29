import RecordService from '../services/record.service';

export async function getByUser(req, res, next) {
  try {
    const { sub: userId } = req.user;
    const records = await new RecordService().getRecords(userId);
    res.send(records);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function post(req, res, next) {
  try {
    const { sub: userId } = req.user;
    const { message } = req.body;
    const record = await new RecordService().postRecord(message, userId);

    res.send({
      message: record.message,
      createdAt: record.createdAt,
      _id: record._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function patch(req, res, next) {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const record = await new RecordService().updateRecord(id, message);

    res.send({
      message: record.message,
      createdAt: record.createdAt,
      _id: record._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const isDeleted = await new RecordService().deleteRecord(id);
    res.send(isDeleted);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
