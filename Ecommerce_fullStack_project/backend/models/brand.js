const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({

    brandName:{
        type:String,
        lowercase:true,
        required:[true,"Brand Name is required"],
        unique:true,
        trim:true,
    },



});


module.exports = mongoose.model('Brand', BrandSchema);

