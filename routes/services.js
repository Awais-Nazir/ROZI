const express = require("express");
const router = express.Router();
// const multer = require("multer");
const mongoose = require("mongoose");
const Service = require("../models/Service"); // Ensure correct path to Service model

///////////////////////////////////////////////////////////////////

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../src/images/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/upload-image", upload.single("image"), async (req, res) => {
//   console.log(req.body);
//   const { seller, title, description, category } = req.body;
//   const imageName = req.file.filename;

//   try {
//     await Images.create({ image: imageName });
//     res.json({ status: "ok" });
//   } catch (error) {
//     res.json({ status: error });
//   }
// });


// Create Service
router.post("/create",  async (req, res) => {
  console.log(req.body)

  const { seller, title, description, category } = req.body;
  // const profilePicture = req.file.filename;
  // Validate seller ID
  if (!seller || !mongoose.Types.ObjectId.isValid(seller)) {
    return res.status(400).json({ error: "Invalid or missing seller ID" });
  }

  // Validate required fields
  if (!seller || !title || !description || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Use uploaded image or a default image
    // const profilePicture = req.file ? req.file.path : "uploads/default.jpg";

    const service = new Service({
      seller,
      title,
      description,
      category,
      // profilePicture,
    });

    await service.save();
    res.status(201).json({ message: "Service created successfully", service });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get services (buyer action)
router.get('/', async (req, res) => {
  const { category, search } = req.query;

  try {
    // Build filter
    let filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: 'i' };

    // Fetch services
    const services = await Service.find(filter).populate('seller', 'name phone email');
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get random services if no filter applied
router.get('/random', async (req, res) => {
  try {
    const services = await Service.aggregate([{ $sample: { size: 5 } }]); // Fetch 5 random services
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;
