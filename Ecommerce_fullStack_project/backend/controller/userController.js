const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, password, mobile, address, city, gender, role } =
    req.body;
  try {
    const user = new User({
      name,
      email,
      password,
      mobile,
      address,
      city,
      gender,
      role,
    });
    const u = await user.save();
    res
      .status(201)
      .json({ status: true, user: u, message: "Register Succefully" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};




const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, message: "USER NOT FOUND" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ status: false, message: "WRONG PASSWORD" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      status: true,
      token,
      message: "Login Succefully",
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
        mobile: user.mobile,
        address: user.address,
        city: user.city,
        gender: user.gender,
        role: user.role
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { address,city } = req.body;
  try {
    const blog = await BlogSchema.findByIdAndUpdate(
      id,
      { address,city },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ status: false, message: "Blog not found" });
    }
    res.json({ status: true, blog, message: "Blog Details Update Succefully" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogSchema.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ status: false, message: "Blog not found" });
    }
    res.json({ status: true, message: "Blog Details deleted Succefully" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, updateUser, deleteUser };
