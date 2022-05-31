const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.model");
const express = require('express')
const router = require("express").Router();

router.get("/create", (req, res, next) => {
  res.render("./celebrities/new-celebrity");
});

router.post("/create", async (req, res, next) => {
  try {
    console.log(req.body)
    await Celebrity.create(req.body);
    res.redirect('/celebrities')
  } catch (error) {
    res.render("./celebrities/new-celebrity")
  }
});

router.get("/", async(req, res, next) => {
    try {
        const celebritiesFromDB = await Celebrity.find()
        res.render("./celebrities/celebrities", {celebritiesFromDB});
    } catch (error) {
        console.log("Error occured while listing celebrities", error)
    }
    
  });

module.exports = router;
