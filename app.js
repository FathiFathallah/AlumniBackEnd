//Connection to the DataBase
const { dbConnection } = require("./config/dbConnection");
dbConnection();
//Make an Application for the server to run on using Express.JS
const express = require("express");
const app = express();
const cors = require("cors");
//Middleware Router - API
app.use(cors());
app.use(express.json());
//Routing Middle Wares
app.use(require("./api/user.api"));
app.use(require("./api/post.api"));
app.use(require("./api/orginization.api"));
app.use(require("./api/job.api"));
app.use(require("./api/association.api"));
app.use(require("./api/university.api"));
app.use(require("./api/scholarship.api"));
app.use(require("./api/event.api"));
app.get("/", (req, res) => {
  res.send("Hello, this is the BackEnd Website");
});
// app.all("*", (req, res) => res.json({ message: "page not found 404" }));
//Creating the Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running at port := ${port}!`));
