
const express = require("express");
const router = express.Router();
const Form = require("../models/Form");

router.post("/", async (req, res) => {
  const newForm = new Form(req.body);
  await newForm.save();
  res.json(newForm);
});

router.get("/", async (req, res) => {
  const forms = await Form.find();
  res.json(forms);
});

module.exports = router;
