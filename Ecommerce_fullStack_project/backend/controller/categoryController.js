const mongoose = require('mongoose');
const url = require('url');
const CategorySchema= require('../models/category.js')


const Category = require('../models/category'); // Correctly importing the model



const saveCategory = async (req, res, next) => {
  console.log("request :",req.body);
  
  const categoryDetails = req.body;

  try {
    const cat = await Category.create(categoryDetails);
    res.status(201).json({ status: true, message: "Category details saved successfully", cat });
  } catch (error) {
    console.error('Error saving category:', error); // Log the error for debugging

    if (error.name === 'ValidationError') {
      return res.status(400).json({ status: false, message: error.message });
    } else if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({ status: false, message: 'Category name must be unique' });
    }

    res.status(500).json({ status: false, message: 'Server error' });
  }
};







var getCategory = async (req, res, next) => {
    var obj = url.parse(req.url, true).query;
    console.log(obj);


    try {
        var CatList = await CategorySchema.find(obj)

        var len = CatList.length;

        if (len !== 0) {
            return res.status(201).json({ "status": true, "CatList": CatList });
        } else {
            return res.status(404).json({ "result": "CatList Not Found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "result": "Server Error" });
    }
};





    const updateCategory = async (req, res) => {
        const { id } = req.params;
        const {catName} = req.body;
        try {
          const Cat = await CategorySchema.findByIdAndUpdate( id, { catName}, { new: true });          
          if (!Cat) {
            return res.status(404).json({ status:false, message: 'Category not found' });
          }
          res.json({status:true, Cat, message:"Category Details Update Succefully"});
        } catch (error) {
          res.status(500).json({status:false, message: 'Server error' });
        }
      };
      



const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
      const Cat = await CategorySchema.findByIdAndDelete(id);
      if (!Cat) {
        return res.status(404).json({status:false, message: 'Category not found' });
      }
      res.json({status:true, message: 'Category  deleted Succefully' });
    } catch (error) {
      res.status(500).json({status:false, message: 'Server error' });
    }
  };
  
    


  module.exports = { saveCategory, getCategory , deleteCategory, updateCategory};
