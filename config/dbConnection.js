const mongoose = require("mongoose");

dbConnection = () => {
  mongoose.connect(
    "mongodb+srv://fathiali:LBRNgvEqItvoho3I@cluster0.8ivro4t.mongodb.net/Alumni"
  );
};

module.exports = { dbConnection };
