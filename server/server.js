const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const movieM = require("./seed.js");

const app = express();
app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/history/data", async (req, res) => {
  const movie = await movieM.find();
  res.json(movie);
});

app.post("/history/data", (req, res) => {
  console.log(req.body);
  const name = req.body.title;
  const year = req.body.year;
  const poster = req.body.poster;
  const watchlist = req.body.watchlist;
  const movie = new movieM({
    name,
    year,
    poster,
    watchlist,
  });
  movie
    .save()
    .then((movie) => res.json(movie))
    .catch((err) => res.status(400).json({ success: false }));
});

app.get("/history/data/:name", async (req, res) => {
  const element = await movieM.find({ name: req.params.name });
  return res.json(element);
});

app.patch("/history/data/:name", async (req, res) => {
  const { watchlist } = req.body;

  const updated = await movieM.findOneAndUpdate(
    { name: req.params.name },
    { watchlist }
  );

  return res.json(updated);
});

app.listen(5000, () => console.log("Server started on port 5000"));
