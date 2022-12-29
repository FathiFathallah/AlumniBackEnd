const { associationModel } = require("../models/association.model");
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res) => {
  const {
    associationName,
    description,
    expertName,
    category,
    expertPhoneNumber,
    country,
    city,
    expertEmailAddress,
    password,
  } = req.body;
  const userEmail = await associationModel.findOne({ expertEmailAddress });
  if (userEmail) {
    res.json({ message: "email already exists" });
  } else {
    bcrypt.hash(password, 4, async (err, hash) => {
      await associationModel.insertMany({
        associationName,
        description,
        expertName,
        category,
        expertPhoneNumber,
        country,
        city,
        expertEmailAddress,
        coverImg: req.files[0].filename,
        expertImg: req.files[1].filename,
        password: hash,
      });
      res.json({ message: `success` });
    });
  }
};
