const mongoose = require('mongoose');

dbConnection = () => {
    mongoose.connect("mongodb://localhost:27017/Alumni");
};

module.exports = { dbConnection };