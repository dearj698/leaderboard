var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING =
  "mongodb+srv://admin:1234@cluster0.iak2fts.mongodb.net/?retryWrites=true&w=majority";

var DATABASENAME = "leaderboard";
var database;

app.listen(5038, () => {
  MongoClient.connect(CONNECTION_STRING, (error, cleint) => {
    database = cleint.db(DATABASENAME);
    console.log("Mongodb connection successful");
  });
});

app.get("/api/leaderboard/GetUsers", (reuqest, response) => {
  database
    .collection("leaderboardUser")
    .find({})
    .toArray((error, result) => {
      response.send(result);
    });
});

app.delete("/api/leaderboard/DeleteUser", (request, response) => {
  database.collection("leaderboardUser").deleteOne({
    id: request.query.id,
  });
  response.json("Delete successfully");
});

app.post("/api/leaderboard/AddUser", multer().none(), (request, response) => {
  database.collection("leaderboardUser").count({}, function (error, num) {
    database.collection("leaderboardUser").insertOne({
      ...request.body,
      id: (num + 1).toString(),
      score: 0,
    });
    response.json("User added successfully");
  });
});

app.put("/api/leaderboard/UpdateUser", multer().none(), (request, response) => {
  database.collection("leaderboardUser").count({}, function (error, num) {
    database.collection("leaderboardUser").updateOne(
      { id: request.query.id },
      {
        $set: { ...request.body },
      }
    );
    response.json("User updated successfully");
  });
});
