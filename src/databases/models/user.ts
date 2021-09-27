import { model, Schema } from "mongoose";

const EmailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// first_name, last_name, email, phone
const userSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
        validator: (email: string) => EmailRegEx.test(email),
        message: "Email is not unique",
    }
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
});

const User = model("User", userSchema);

export default User;
