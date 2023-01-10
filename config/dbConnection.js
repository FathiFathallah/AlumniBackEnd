const mongoose = require("mongoose");

dbConnection = () => {
  mongoose.connect(
    "mongodb+srv://dbAdmin:glUDYkxgh01mXqWg@cluster0.8ivro4t.mongodb.net/Alumni?retryWrites=true&w=majority"
  );
};

module.exports = { dbConnection };
