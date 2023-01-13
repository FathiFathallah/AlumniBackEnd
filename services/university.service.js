const { universityModel } = require("../models/university.model");
const bcrypt = require("bcrypt");

module.exports.signUpUniversities = async (req, res) => {
  const {
    universityName,
    description,
    expertName,
    category,
    expertPhoneNumber,
    country,
    city,
    expertEmailAddress,
    password,
  } = req.body;
  const uniEmail = await universityModel.findOne({ expertEmailAddress });
  if (uniEmail) {
    res.json({ message: "email already exists" });
  } else {
    bcrypt.hash(password, 4, async (err, hash) => {
      await universityModel.insertMany({
        universityName,
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

module.exports.getAllUniversities = async (req, res) => {
  let university = await universityModel.find({});
  res.json({ message: `success`, university });
};
