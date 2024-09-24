const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    productName:{
        type:String,
        required:[true,"product name is required"],
        trim:true,
    },
      productImage: {
    type:String,
    required:[true,"product Image is required"],
  },

      categoryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference the User model
    required: true,

  },
  

  brandId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand', // Reference the User model
    required: true,

  },
  description:{
    type:String,
    lowercase:true,
    required:[true,"Description is required"],
    trim:true,
},
price:{
    type:String,
    lowercase:true,
    required:[true,"Price is required"],
    trim:true,
},

  date: {
    type: Date,
    default: Date.now,
  },
  
  
});


module.exports = mongoose.model('product', ProductSchema);

