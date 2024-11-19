// import mongoose from "mongoose";

// // Define the User schema
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone_no: { type: String, required: true },
//   address: { type: String, required: true },
//   sellItems: [
//     {
//       type: { type: String, required: true },
//       weight: { type: String, required: true },
//       price: { type: String, required: true },
//       quality: { type: String, required: true },
//     },
//   ],
//   donateItems: [
//     {
//       type: { type: String, required: true },
//       weight: { type: String, required: true },
//       quality: { type: String, required: true },
//     },
//   ],
// });

// // Export the User model
// export const User = mongoose.model("User", userSchema);
import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone_no: { type: String, required: true },
  address: { type: String, required: true },
  orders: { 
    type: Array, 
    default: [], 
    validate: {
      validator: Array.isArray,
      message: "Orders must be an array",
    },
  },
});

// Export the User model
export const User = mongoose.model("User", userSchema);
