const mongoose = require("mongoose");
const Movie = require("../models/Movie.model");
const express = require("express");
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

router.get("/create", async (req, res, next) => {
  const celebritiesFromDB = await Celebrity.find();
  res.render("./movies/new-movie", { celebritiesFromDB });
});

router.post("/create", async (req, res, next) => {
  try {
    await Movie.create(req.body);
    res.redirect("/movies");
  } catch (error) {
    res.redirect("/movies/create");
  }
});

router.get("/", async (req, res, next) => {
  try {
    const moviesFromDB = await Movie.find();
    res.render("./movies/movies", { moviesFromDB });
  } catch (error) {
    console.log("Error occured while listing movies", error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movieDetails = await Movie.findById(movieId).populate("cast");

    res.render(`./movies/movie-details`, { movieDetails });
  } catch (error) {
    console.log("Error occured while looking movie details", error);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    console.log("Error occured while deleting movies:", error);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  const movieEdit = await Movie.findById(req.params.id);
  const celebritiesFromDB = await Celebrity.find()
  res.render("./movies/edit-movie", { movieEdit, celebritiesFromDB });
});

router.post("/:id/edit", async (req, res, next) => {
  try {
      await Movie.findByIdAndUpdate(req.params.id, req.body)
      res.redirect(`/movies/${req.params.id}`)
  } catch (error) {
    console.log("Error occured while updating a movie", error)
    res.redirect("./movies/:id/delete")
  }
});

module.exports = router;
