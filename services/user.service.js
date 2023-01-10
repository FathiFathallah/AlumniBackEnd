const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../email/user.email");
const path = require("path");

//Sign Up To Alumni
module.exports.signUp = async (req, res) => {
  const {
    firstName,
    lastName,
    birthDate,
    emailAddress,
    country,
    phoneNumber,
    studyField,
    studyState,
    userName,
    password,
  } = req.body;
  const userEmail = await userModel.findOne({ emailAddress });
  const userPhone = await userModel.findOne({ phoneNumber });
  if (userEmail) {
    res.json({ message: "email already exists" });
  } else if (userPhone) {
    res.json({ message: "phone already exists" });
  } else {
    bcrypt.hash(password, 4, async (err, hash) => {
      await userModel.insertMany({
        firstName,
        lastName,
        birthDate,
        emailAddress,
        country,
        phoneNumber,
        studyField,
        studyState,
        userName,
        password: hash,
      });
      let token = jwt.sign(
        { emailAddress, firstName, lastName, phoneNumber },
        "AlumniVerifyEmail___"
      );
      sendEmail({ emailAddress, token });
      res.json({ message: `success` });
    });
  }
};

//Verify Alumni Account
module.exports.emailVerify = async (req, res) => {
  let { token } = req.params;
  console.log(token);
  jwt.verify(token, "AlumniVerifyEmail___", async (err, decoded) => {
    if (err) {
      res.json(err);
    } else {
      let emailAddress = decoded.emailAddress;
      let user = await userModel.findOne({ emailAddress });
      if (user) {
        await userModel.findOneAndUpdate(
          { emailAddress },
          { emailConfirm: true }
        );
        res.json({ message: "email verified" });
      } else {
        res.json({ message: "user not found" });
      }
    }
  });
};

//LogIn Alumni Account
module.exports.logIn = async (req, res) => {
  const { emailAddress, password } = req.body;
  let user = await userModel.findOne({ emailAddress });
  let org = await orginizationModel.findOne({
    expertEmailAddress: emailAddress,
  });
  let association = await associationModel.findOne({
    expertEmailAddress: emailAddress,
  });
  let university = await universityModel.findOne({
    expertEmailAddress: emailAddress,
  });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      //let token = jwt.sign({userId:user._id,name:user.name,emailConfirm:user.emailConfirm},'alumni@nodeJS');
      if (user.isAdmin)
        res.json({ message: "success top admin", _id: user._id });
      else if (user.emailConfirm)
        res.json({ message: "success user", _id: user._id });
      else res.json({ message: "email verification needed" });
    } else {
      res.json({ message: "password incorrect" });
    }
  } else if (org) {
    const match = await bcrypt.compare(password, org.password);
    if (match) {
      res.json({ message: "success channel admin", _id: org._id });
    } else {
      res.json({ message: "password incorrect" });
    }
  } else if (association) {
    const match = await bcrypt.compare(password, association.password);
    if (match) {
      res.json({
        message: "success membership admin",
        _id: association._id,
      });
    } else {
      res.json({ message: "password incorrect" });
    }
  } else if (university) {
    const match = await bcrypt.compare(password, university.password);
    if (match) {
      res.json({
        message: "success university admin",
        _id: university._id,
      });
    } else {
      res.json({ message: "password incorrect" });
    }
  } else {
    res.json({ message: "email does not exists" });
  }
};

//Get Personal Information
module.exports.getPerosnalInfo = async (req, res) => {
  let { _id } = req.params;
  let user = await userModel.findOne({ _id });
  let {
    firstName,
    lastName,
    birthDate,
    country,
    city,
    phoneNumber,
    profilePic,
    cv,
  } = user;
  birthDate =
    birthDate.getFullYear() +
    "-" +
    (Number(birthDate.getMonth()) + 1) +
    "-" +
    birthDate.getDate();
  let personalInfo = {
    firstName,
    lastName,
    birthDate,
    country,
    city,
    phoneNumber,
    profilePic,
    cv,
  };
  res.json({ message: "success", personalInfo });
};

//Update Personal Information
module.exports.updatePerosnalInfo = async (req, res) => {
  const { _id, firstName, lastName, birthDate, country, city, phoneNumber } =
    req.body;
  let user = await userModel.findOne({ phoneNumber });
  if (!user || _id == user._id) {
    await userModel.findOneAndUpdate(
      { _id },
      {
        firstName,
        lastName,
        birthDate,
        country,
        city,
        phoneNumber,
      }
    );
    res.json({ message: "success" });
  } else {
    res.json({ message: "phone already exists" });
  }
};

//Upload User Profile Picture
module.exports.uploadUserProfilePic = async (req, res) => {
  const { _id } = req.body;
  let user = await userModel.findOneAndUpdate(
    { _id },
    { profilePic: req.file.filename }
  );
  if (user) res.json({ message: "success" });
  else res.json({ message: "something went wrong" });
};

//Upload User CV|RESUME
module.exports.uploadUserCV = async (req, res) => {
  const { _id } = req.body;
  let user = await userModel.findOneAndUpdate(
    { _id },
    { cv: req.file.filename }
  );
  if (user) res.json({ message: "success" });
  else res.json({ message: "something went wrong" });
};

//Get Account Information
module.exports.getAccountInfo = async (req, res) => {
  let { _id } = req.params;
  let user = await userModel.findOne({ _id });
  let { emailAddress, userName, about } = user;
  let AccountInfo = {
    emailAddress,
    userName,
    about,
  };
  res.json({ message: "success", AccountInfo });
};

//Update Account Information
module.exports.updateAccountInfo = async (req, res) => {
  const { _id, emailAddress, userName, about } = req.body;
  let user = await userModel.findOne({ emailAddress });
  if (!user || _id == user._id) {
    await userModel.findOneAndUpdate(
      { _id },
      {
        emailAddress,
        userName,
        about,
      }
    );
    res.json({ message: "success" });
  } else {
    res.json({ message: "email already exists" });
  }
};

//GET ALL INFORMATION
module.exports.getAllInfo = async (req, res) => {
  let { _id } = req.params;
  let user = await userModel.findOne({ _id });
  res.json({ message: "success", user });
};

//Update Skills
module.exports.updateSkills = async (req, res) => {
  const { _id, newSkill } = req.body;
  let user = await userModel.findOne({ _id });
  if (user) {
    await userModel.findOneAndUpdate(
      { _id },
      {
        $addToSet: {
          skills: {
            skillId: user.skills.length + 1,
            newSkill,
          },
        },
      }
    );
    res.json({ message: "success" });
  } else {
    res.json({ message: "user not found" });
  }
};

//Update Position
module.exports.updatePosition = async (req, res) => {
  const { _id, company, startDate, positionName, positionDetails } = req.body;
  let user = await userModel.findOne({ _id });
  if (user) {
    await userModel.findOneAndUpdate(
      { _id },
      {
        $addToSet: {
          positions: {
            positionId: user.positions.length + 1,
            company,
            startDate,
            positionName,
            positionDetails,
          },
        },
      }
    );
    res.json({ message: "success" });
  } else {
    res.json({ message: "user not found" });
  }
};

//Update Education
module.exports.updateEducation = async (req, res) => {
  const {
    _id,
    university,
    faculty,
    specialization,
    degree,
    startDate,
    endDate,
  } = req.body;
  let user = await userModel.findOne({ _id });
  if (user) {
    await userModel.findOneAndUpdate(
      { _id },
      {
        $addToSet: {
          education: {
            educationId: user.education.length + 1,
            university,
            faculty,
            specialization,
            degree,
            startDate,
            endDate,
          },
        },
      }
    );
    res.json({ message: "success" });
  } else {
    res.json({ message: "user not found" });
  }
};

//Update Experiences
module.exports.updateExperience = async (req, res) => {
  const { _id, orginization, startDate, endDate, details } = req.body;
  let fileName = req.file.filename;
  let user = await userModel.findOne({ _id });
  if (user) {
    await userModel.findOneAndUpdate(
      { _id },
      {
        $addToSet: {
          experience: {
            experienceId: user.experience.length + 1,
            orginization,
            startDate,
            endDate,
            details,
            fileName,
          },
        },
      }
    );
    res.json({ message: "success" });
  } else {
    res.json({ message: "user not found" });
  }
};

//Get Experinece
module.exports.getExperience = async (req, res) => {
  let { _id } = req.params;
  let user = await userModel.findOne({ _id });
  res.json({ experience: user.experience });
};

//Get Experinece File
module.exports.getExperienceFile = async (req, res) => {
  let { _id, experienceId } = req.body;
  let user = await userModel.findOne({ _id });
  const result = user.experience.filter(function (el) {
    return el.experienceId == experienceId;
  });
  res.sendFile(
    __dirname.substring(0, __dirname.length - 8) +
      "experiencesFiles\\" +
      result[0].fileName
  );
};

//Get Education
module.exports.getEducation = async (req, res) => {
  let { _id } = req.params;
  let user = await userModel.findOne({ _id });
  res.json({ education: user.education });
};

//Get Positions
module.exports.getPositions = async (req, res) => {
  let { _id } = req.params;
  let user = await userModel.findOne({ _id });
  res.json({ positions: user.positions });
};

//Get Skills
module.exports.getSkills = async (req, res) => {
  let { _id } = req.params;
  let user = await userModel.findOne({ _id });
  res.json({ skills: user.skills });
};

// GET PROFILE PICTURE
module.exports.getProfilePicture = async (req, res) => {
  let { _id } = req.params;
  let user = await userModel.findOne({ _id });
  const { profilePic } = user;
  res.sendFile(
    __dirname.substring(0, __dirname.length - 8) +
      "profilePictures\\" +
      profilePic
  );
};

// GET CV
module.exports.getCV = async (req, res) => {
  let { _id } = req.params;
  let user = await userModel.findOne({ _id });
  const { cv } = user;
  res.sendFile(
    __dirname.substring(0, __dirname.length - 8) + "//resumesCV//" + cv
  );
};

//TEST | SENDING AND RECEIVING FILES
const fs = require("fs");
const { orginizationModel } = require("../models/orginization.model");
const { associationModel } = require("../models/association.model");
const { universityModel } = require("../models/university.model");
module.exports.getFileTest = async (req, res) => {
  let { _id } = req.params;
  let user = await userModel.findOne({ _id });
  //res.sendFile((__dirname.substring(0, __dirname.length-8) + 'profilePictures\\1668534880867-284233604-0ab268c8a5918132e1bccb7291a7c351.jpg'));
  let dataFile = fs.readFileSync(
    __dirname.substring(0, __dirname.length - 8) +
      "profilePictures\\" +
      user.profilePic
  );
  let a = path.extname(user.profilePic).toLowerCase();
  let type;
  if (
    a == ".jpeg" ||
    a == ".jpg" ||
    a == ".png" ||
    a == ".tiff" ||
    a == ".gif"
  ) {
    type = "img";
  } else if (
    a == ".mp4" ||
    a == ".m4a" ||
    a == ".f4v" ||
    a == ".m4b" ||
    a == ".mov"
  ) {
    type = "video";
  }
  let file = { dataFile, type };
  res.json({ message: "success", user, file });
};

//Change Experinece
module.exports.changeExperience = async (req, res) => {
  let { _id, experienceId, orginization, startDate, endDate, details } =
    req.body;
  await userModel.updateOne(
    { _id, "experience.experienceId": Number(experienceId) },
    {
      $set: {
        "experience.$.orginization": orginization,
        "experience.$.startDate": startDate,
        "experience.$.endDate": endDate,
        "experience.$.details": details,
        "experience.$.fileName": req.file.filename,
      },
    }
  );
  res.json({ message: "success" });
};

//Delete Experinece
module.exports.deleteExperience = async (req, res) => {
  const { _id, experienceId } = req.body;
  await userModel.updateOne(
    { _id },
    { $pull: { experience: { experienceId: Number(experienceId) } } }
  );

  let user = await userModel.findOne({ _id });
  let { experience } = user;
  for (let i = 0; i < experience.length; i++) {
    experience[i].experienceId = i + 1;
  }
  await userModel.findOneAndUpdate({ _id }, { experience });
  res.json({ message: "success" });
};

//Change Education
module.exports.changeEducation = async (req, res) => {
  const {
    _id,
    educationId,
    university,
    faculty,
    specialization,
    degree,
    startDate,
    endDate,
  } = req.body;
  await userModel.updateOne(
    { _id, "education.educationId": Number(educationId) },
    {
      $set: {
        "education.$.university": university,
        "education.$.faculty": faculty,
        "education.$.specialization": specialization,
        "education.$.degree": degree,
        "education.$.startDate": startDate,
        "education.$.endDate": endDate,
      },
    }
  );
  res.json({ message: "success" });
};

//Delete Education
module.exports.deleteEducation = async (req, res) => {
  const { _id, educationId } = req.body;
  await userModel.updateOne(
    { _id },
    { $pull: { education: { educationId: Number(educationId) } } }
  );

  let user = await userModel.findOne({ _id });
  let { education } = user;
  for (let i = 0; i < education.length; i++) {
    education[i].educationId = i + 1;
  }
  await userModel.findOneAndUpdate({ _id }, { education });
  res.json({ message: "success" });
};

//Change Position
module.exports.changePosition = async (req, res) => {
  const { _id, positionId, company, startDate, positionName, positionDetails } =
    req.body;
  await userModel.updateOne(
    { _id, "positions.positionId": Number(positionId) },
    {
      $set: {
        "positions.$.company": company,
        "positions.$.startDate": startDate,
        "positions.$.positionName": positionName,
        "positions.$.positionDetails": positionDetails,
      },
    }
  );
  res.json({ message: "success" });
};

//Delete Position
module.exports.deletePosition = async (req, res) => {
  const { _id, positionId } = req.body;
  await userModel.updateOne(
    { _id },
    { $pull: { positions: { positionId: Number(positionId) } } }
  );

  let user = await userModel.findOne({ _id });
  let { positions } = user;
  for (let i = 0; i < positions.length; i++) {
    positions[i].positionId = i + 1;
  }
  await userModel.findOneAndUpdate({ _id }, { positions });
  res.json({ message: "success" });
};

//Change Skills
module.exports.changeSkills = async (req, res) => {
  const { _id, skillId, newSkill } = req.body;
  await userModel.updateOne(
    { _id, "skills.skillId": Number(skillId) },
    {
      $set: {
        "skills.$.newSkill": newSkill,
      },
    }
  );
  res.json({ message: "success" });
};

//Delete Skill
module.exports.deleteSkills = async (req, res) => {
  const { _id, skillId } = req.body;
  await userModel.updateOne(
    { _id },
    { $pull: { skills: { skillId: Number(skillId) } } }
  );

  let user = await userModel.findOne({ _id });
  let { skills } = user;
  for (let i = 0; i < skills.length; i++) {
    skills[i].skillId = i + 1;
  }
  await userModel.findOneAndUpdate({ _id }, { skills });
  res.json({ message: "success" });
};

//Upload Documents
module.exports.uploadDocuments = async (req, res) => {
  const { _id, updateArrayFiles } = req.body;
  let user = await userModel.findOne({ _id });
  let { documents } = user;
  if (updateArrayFiles[0] != "undefined") {
    documents[0] = { cv: req.files[0].filename };
  }
  if (updateArrayFiles[1] != "undefined") {
    documents[1] = { personalId: req.files[1].filename };
  }
  if (updateArrayFiles[2] != "undefined") {
    documents[2] = { personalPassport: req.files[2].filename };
  }
  if (updateArrayFiles[3] != "undefined") {
    documents[3] = { universityTranscript: req.files[3].filename };
  }
  await userModel.findOneAndUpdate({ _id }, { documents });
  res.json({ message: "success" });
};

//Get Documents Name
module.exports.getAllDocumentsNames = async (req, res) => {
  const { _id } = req.params;
  let user = await userModel.findOne({ _id });
  let { documents } = user;
  res.json({ message: "success", documents });
};

//Get Document File
module.exports.getDocumentFile = async (req, res) => {
  const { _id, fileType } = req.body;
  let user = await userModel.findOne({ _id });
  let { documents } = user;
  let filename = "";
  if (fileType == "cv") {
    filename = documents[0].cv;
  } else if (fileType == "personalId") {
    filename = documents[1].personalId;
  } else if (fileType == "personalPassport") {
    filename = documents[2].personalPassport;
  } else if (fileType == "universityTranscript") {
    filename = documents[3].universityTranscript;
  }
  res.sendFile(
    __dirname.substring(0, __dirname.length - 8) + "documentFiles\\" + filename
  );
};

//GET TIMELINE
module.exports.getDocumentFile = async (req, res) => {
  const { _id, fileType } = req.body;
  let user = await userModel.findOne({ _id });
  let { documents } = user;
  let filename = "";
  if (fileType == "cv") {
    filename = documents[0].cv;
  } else if (fileType == "personalId") {
    filename = documents[1].personalId;
  } else if (fileType == "personalPassport") {
    filename = documents[2].personalPassport;
  } else if (fileType == "universityTranscript") {
    filename = documents[3].universityTranscript;
  }
  res.sendFile(
    __dirname.substring(0, __dirname.length - 8) + "documentFiles\\" + filename
  );
};
