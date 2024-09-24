const productSchema = require('../models/product.js');
const Randomstring = require('randomstring');
const path = require('path');
const url = require('url');
const mongoose = require('mongoose');
const { log } = require('console');


// code with image uplaod

var saveProduct = async (req, res, next) => {
  try {
    console.log("fghnm,");
    
      console.log(req.files);         // Log this to check what files are being received
      if (!req.files || !req.files.productImage) {
          return res.status(400).json({ status: false, message: "No image uploaded" });
      }
      
      var productDetails = req.body;
      var post = req.files.productImage;
 console.log(req.body);
 
      // Generate unique image name
      var productImage = Date.now() + "-" + Randomstring.generate() + "-" + post.name;
      productDetails = { ...productDetails, productImage };

      // Save product in the database
      var productSave = await productSchema.create(productDetails);
      console.log("Product saved: " + productSave);

      // Move the image to upload directory
      var uploadPath = path.join(__dirname, '../../frontend/ui/public/upload_image', productImage);
      post.mv(uploadPath, (err) => {
          if (err) {
              return res.status(500).json({ status: false, message: "File upload failed" });
          }
      });

      res.status(201).json({ status: true, product: productSave, message: "Product added successfully" });
  } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Product not added" });
  }
};


// code without image uplaod

// var saveProduct = async (req, res, next) => {
//   var productDetails = req.body;

//   try {
//       // Add validation if necessary
//       var brandSave = await productSchema.create(productDetails);
//       console.log("Brand Save is:", brandSave);

//       res.status(201).json({ 
//           status: true, 
//           brand: brandSave, 
//           message: "Brand added successfully" 
//       });

//   } catch (err) {
//       console.error("Error saving brand:", err.message);
//       res.status(500).json({ 
//           status: false, 
//           message: "Brand not added", 
//           error: err.message // Only for development environments showing the error from ModelSchema
//       });
//   }
// };





var getProduct = async (req, res, next) => {
    var obj = url.parse(req.url, true).query;
    console.log(obj);

    try {
        // Fetch products and populate user data (only 'name' field is selected)
        var productList = await productSchema.find(obj).populate('categoryId', 'catName').populate('brandId', 'brandName')

        var len = productList.length;

        if (len !== 0) {
            return res.status(201).json({ "status": true, "productList": productList });
        } else {
            return res.status(404).json({ "result": "products Not Found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "result": "Server Error" });
    }
};





const updateProduct = async (req, res) => {
        const { id } = req.params;
        const { productName,description, price} = req.body;
        try {
          const product = await productSchema.findByIdAndUpdate( id, {productName,description, price}, { new: true });          
          if (!product) {
            return res.status(404).json({ status:false, message: 'product not found' });
          }
          res.json({status:true, product, message:"product Details Update Succefully"});
        } catch (error) {
          res.status(500).json({status:false, message: 'Server error' });
        }
      };

      
      
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await productSchema.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({status:false, message: 'product not found' });
      }
      res.json({status:true, message: 'product Details deleted Succefully' });
    } catch (error) {
      res.status(500).json({status:false, message: 'Server error' });
    }
  };
  
    


  module.exports = { saveProduct, getProduct , deleteProduct, updateProduct};
