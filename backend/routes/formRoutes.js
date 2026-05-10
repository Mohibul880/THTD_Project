const express = require("express");
const router = express.Router();

const Form = require("../models/Form");



// ====================================
// GET ALL DATA
// ====================================

router.get("/", async (req, res) => {

  try {

    // frontend থেকে sort value নিবে
    // asc অথবা desc
    const sortOrder = req.query.sort;

    // asc হলে 1
    // desc হলে -1
    const sortValue = sortOrder === "asc" ? 1 : -1;

    const forms = await Form.find()
      .sort({ serialNumber: sortValue });

    res.status(200).json(forms);

  } catch (error) {

    console.log("GET ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
    });

  }

});



// ====================================
// CREATE DATA
// ====================================

router.post("/", async (req, res) => {

  try {

    const total = await Form.countDocuments();

    const form = new Form({

      serialNumber: total + 1,

      name: req.body.name,

      Age: req.body.Age,

      phone: req.body.phone,

      subject: req.body.subject,

      message: req.body.message,

    });

    await form.save();

    res.status(201).json({
      success: true,
      data: form,
    });

  } catch (error) {

    console.log("CREATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create data",
    });

  }

});



// ====================================
// UPDATE DATA
// ====================================

router.put("/:id", async (req, res) => {

  try {

    const updatedData =
      await Form.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
        }

      );

    res.status(200).json({
      success: true,
      data: updatedData,
    });

  } catch (error) {

    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update data",
    });

  }

});



// ====================================
// DELETE DATA
// ====================================

router.delete("/:id", async (req, res) => {

  try {

    await Form.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });

  } catch (error) {

    console.log("DELETE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete data",
    });

  }

});



module.exports = router;