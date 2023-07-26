const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { off } = require("../models/user.js");
const users = require("../models/user.js");

// Import routes

//Router Middlewares
app.use(express.json());

//default value for limit is 5 and offset is 0
//This route should return an array of _id of all the element that need to be returned.
//output id can be in any order.

app.get("/", async function (req, res) {
  var ids = [];

  //Write your code here
  //modify the ids array
  const limit = parseInt(req.query.limit) || 5;
  const offset = parseInt(req.query.offset) || 0;

  if (limit > 5) {
    return res.status(400).send("Maximum limit value is 5.");
  }

  const usersInRange = await users
    .find({}, { _id: 1 })
    .limit(limit)
    .skip(limit * offset)
    .exec();

  ids = usersInRange.map((user) => user._id);

  res.send(ids);
});

module.exports = app;
