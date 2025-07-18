import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";

import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new Error("Please Fill All the Fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User Already Exists???");

  // hashed User Password...

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.json({
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.staus(400);
    throw new Error("Invalid User Data....");
  }
});

const loginUser = asyncHandler(async(req, res) => {

  const {email, password} = req.body;

  const existingUser = await User.findOne({email})
  
  if(existingUser) {

    const isPasswordValid = await bcrypt.compare(
      password, 
    existingUser.password
  );

  if(isPasswordValid) {
    createToken(res, existingUser._id)

res.json({
  _id: existingUser._id,
  userName: existingUser.unerName,
  email: existingUser.email,
  isAdmin: existingUser.isAdmin,
});

} else {
    res.status(401).json({ message: "Invalid Password"})
  }

  } else {
    res.status(401).json({ message: "uswer Not Found"});
  }

});


const logOutCurrentUser = asyncHandler(async(req, res)  =>  {

res.cookie('jwt', '' , {
  httOnly: true,
  expires : new Date()

})

res.status(200).json({message: "LogOut Sucessfully"})

})


export { createUser, loginUser, logOutCurrentUser };
