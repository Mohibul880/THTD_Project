const express = require("express");
const router = express.Router();

const Form = require("../models/Form");


// ==============================
// AUTO FIX OLD SERIAL NUMBERS
// ==============================

const fixOldSerialNumbers = async () => {

  const forms = await Form.find().sort({
    createdAt: 1,
  });

  for (let i = 0; i < forms.length; i++) {

    if (!forms[i].serialNumber) {

      forms[i].serialNumber = i + 1;

      await forms[i].save();

    }

  }

};


// ==============================
// POST NEW DATA
// ==============================

router.post("/", async (req, res) => {

  try {

    // পুরাতন Serial Fix
    await fixOldSerialNumbers();

    // Last Serial বের করা
    const lastData = await Form.findOne().sort({
      serialNumber: -1,
    });

    // নতুন Serial
    const newSerial = lastData
      ? lastData.serialNumber + 1
      : 1;

    // Save New Data
    const form = new Form({

      serialNumber: newSerial,

      name: req.body.name,

      Age: req.body.Age,

      phone: req.body.phone,

      subject: req.body.subject,

      message: req.body.message,

    });

    await form.save();

    res.status(201).json(form);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});


// ==============================
// GET ALL DATA
// ==============================

router.get("/", async (req, res) => {

  try {

    // পুরাতন Serial Fix
    await fixOldSerialNumbers();

    // Sorting
    const sortOrder =
      req.query.sort === "asc"
        ? 1
        : -1;

    // Fetch Data
    const forms = await Form.find().sort({
      serialNumber: sortOrder,
    });

    res.status(200).json(forms);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

module.exports = router;