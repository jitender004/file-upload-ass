const postSingle = (model) => async (req, res) => {
  try {
    const item = await model.create({
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      pincode: req.body.pincode,
      age: req.body.age,
      gender: req.body.gender,
      profile_pic: req.file.path,
    });
    return res.status(201).send(item);
  } catch (er) {
    return res.status(500).send(er.message);
  }
};

const postMultiple = (model) => async (req, res) => {
  try {
    const filePaths = req.files.map((file) => file.path);
    const user = await model.create({
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      pincode: req.body.pincode,
      age: req.body.age,
      gender: req.body.gender,
      profile_pic: filePaths,
    });
    return res.status(201).send(user);
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
};

const getAll = (model) => async (req, res) => {
  try {
    const item = await model.find().lean().exec();
    return res.send(item);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
const getOne = (model) => async (req, res) => {
  try {
    const item = await model.findById(req.params.id);
    return res.send(item);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = (model) => {
  return {
    postSingle: postSingle(model),
    postMultiple: postMultiple(model),
    getAll: getAll(model),
    getOne: getOne(model),
  };
};
