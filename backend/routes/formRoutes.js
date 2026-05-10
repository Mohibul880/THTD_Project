const express = require("express");

const router = express.Router();

const Form = require("../models/Form");



// =====================================
// AUTO FIX SERIAL NUMBERS
// =====================================

const fixSerialNumbers = async () => {

  const forms = await Form.find().sort({
    serialNumber: 1,
  });

  for (let i = 0; i < forms.length; i++) {

    forms[i].serialNumber = i + 1;

    await forms[i].save();

  }

};



// =====================================
// CREATE DATA
// =====================================

router.post("/", async (req, res) => {

  try {

    await fixSerialNumbers();

    const lastData = await Form.findOne().sort({
      serialNumber: -1,
    });

    const newSerial = lastData
      ? lastData.serialNumber + 1
      : 1;

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



// =====================================
// GET ALL DATA
// =====================================

router.get("/", async (req, res) => {

  try {

    await fixSerialNumbers();

    const sortOrder =
      req.query.sort === "asc"
        ? 1
        : -1;

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



// =====================================
// UPDATE DATA
// =====================================

router.put("/:id", async (req, res) => {

  try {

    const updatedForm =
      await Form.findByIdAndUpdate(

        req.params.id,

        {
          name: req.body.name,
          Age: req.body.Age,
          phone: req.body.phone,
          subject: req.body.subject,
          message: req.body.message,
        },

        {
          new: true,
        }

      );

    res.status(200).json(updatedForm);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});



// =====================================
// DELETE DATA
// =====================================

router.delete("/:id", async (req, res) => {

  try {

    await Form.findByIdAndDelete(req.params.id);

    await fixSerialNumbers();

    res.status(200).json({
      message: "Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});



module.exports = router;