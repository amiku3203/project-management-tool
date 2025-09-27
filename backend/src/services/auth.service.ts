import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/auth.model";
import { JWT_SECRET } from "../utils/auth.constants";
 
export const registerUser = async (name: string, email: string, password: string) => {
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

   
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  return { id: user._id, name: user.name, email: user.email };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign({ id: user._id }, JWT_SECRET as Secret, { expiresIn: "7d" });

  return { user, token };
};
