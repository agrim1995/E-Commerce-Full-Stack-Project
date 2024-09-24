const brandSchema = require("../models/brand.js");
const Randomstring = require("randomstring");
// const path = require("path");
const url = require("url");
const mongoose = require("mongoose");


// var saveBrand = async (req, res, next) => {
//   var brandDetails = req.body;
//   var post = req.files.postImage;

//   const brand = await brandSchema.find();

//   var postImage = Date.now() + "-" + Randomstring.generate() + "-" + post.name;
//   // console.log("post Image Name is : " + postImage);

//   brandDetails = { ...brandDetails, postImage };
//   // console.log("Complete brand Details :" + brandDetails);

//   try {
//     var BrandSave = await brandSchema.create(brandDetails);
//     console.log("brand Save is : " + BrandSave);

//     var uploadPath = path.join(__dirname,"../../ui/public/assets/uploadImage",postImage);
//     console.log("path " + uploadPath);
//     post.mv(uploadPath);

//     res
//       .status(201)
//       .json({
//         status: true,
//         brand: BrandSave,
//         message: "Brand Add Successfully",
//       });
//   } catch (err) {
//     res.status(500).json({ status: false, message: "Brand not added" });
//   }
// };


var getBrand = async (req, res, next) => {
  var obj = url.parse(req.url, true).query;
  console.log(obj);

  try {
    // Fetch brands and populate user data (only 'name' field is selected)
    var brandList = await brandSchema.find(obj);

    var len = brandList.length;

    if (len !== 0) {
      return res.status(201).json({ status: true, brandList: brandList });
    } else {
      return res.status(404).json({ result: "brands Not Found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ result: "Server Error" });
  }
};




var saveBrand = async (req, res, next) => {
  var brandDetails = req.body;

  try {
    // Save the brand details directly without handling image uploads
    var BrandSave = await brandSchema.create(brandDetails);
    console.log("Brand Save is: " + BrandSave);

    res.status(201).json({
      status: true,
      Brand: BrandSave,
      message: "Brand Added Successfully",
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Brand not added" });
  }
};




const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { brandName } = req.body; 
  try {
    const brand = await brandSchema.findByIdAndUpdate(
      id,
      { brandName },
      { new: true }
    );
    if (!brand) {
      return res.status(404).json({ status: false, message: "Brand not found" });
    }
    res.json({ status: true, brand, message: "Brand updated successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};




const deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await brandSchema.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ status: false, message: "brand not found" });
    }
    res.json({ status: true, message: "brand  deleted Succefully" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};

module.exports = { saveBrand,getBrand, deleteBrand, updateBrand };
