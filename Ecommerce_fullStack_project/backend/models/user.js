const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required : [true,"Name is Required"],
    lowercase:true,
    trim:true
},
email:{
    type : String,
    required: [true,"Email is Required"],
    unique: true,
    lowercase: true,
    trim: true,
},
password:{
    type: String,
    required: [true,"Password is Required"],
    maxlength:15,
    minlength:5,
    trim: true,
},
mobile:{
    type: String,
    required:[true,"Mobile is Required"],
    maxlength:10,
    minlength:10,
    trim: true,
},
address:{
    type:String,
    required:[true,"Address is Required"],
    trim:true,
},
city:{
    type:String,
    required:[true,"City is Required"],

},
gender: {
    type: String,
    required: [true,"Gender is required"],
  },
  role:{
    type: String,
    required: [true,"User role is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },

});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

module.exports = mongoose.model('User',UserSchema);
