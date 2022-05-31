const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.model");
const express = require("express");
const router = require("express").Router();

router.get("/create", (req, res, next) => {
  res.render("./celebrities/new-celebrity");
});

router.post("/create", async (req, res, next) => {
  try {
    console.log(req.body);
    await Celebrity.create(req.body);
    res.redirect("/celebrities");
  } catch (error) {
    res.render("./celebrities/new-celebrity");
  }
});

router.get("/", async (req, res, next) => {
  try {
    const celebritiesFromDB = await Celebrity.find();
    res.render("./celebrities/celebrities", { celebritiesFromDB });
  } catch (error) {
    console.log("Error occured while listing celebrities", error);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  const celebrityEdit = await Celebrity.findById(req.params.id);
  res.render("./celebrities/edit-celebrity", { celebrityEdit });
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    await Celebrity.findByIdAndUpdate(req.params.id, req.body);
    const celebritiesFromDB = await Celebrity.find();
    res.render("./celebrities/celebrities", {celebritiesFromDB})
  } catch (error) {
      console.log("Error updating a celebrity", error)
      res.redirect(`./celebrities/${req.params.id}/edit`)
  }
});

router.post("/:id/delete", async (req, res, next) => {
    try {
      await Celebrity.findByIdAndDelete(req.params.id, req.body);
      const celebritiesFromDB = await Celebrity.find();
      res.render("./celebrities/celebrities", {celebritiesFromDB})
    } catch (error) {
        console.log("Error updating a celebrity", error)
        res.redirect(`./celebrities/${req.params.id}/edit`)
    }
  });
module.exports = router;
