import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    full_name: string;
    address: string;
    city: string;
    state: string;
    postal: string;
    dob: string;
    password: string;
    phone: string;
    varification_key: string;
    varify_timeout: string;
    active_status: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String,  },
  full_name:  {type: String},
  address:  {type: String},
  city:  {type: String},
  state:  {type: String},
  postal:  {type: String},
  dob:  {type: String},
  password:  {type: String},
  phone:  {type: String},
  varification_key:  {type: String},
  varify_timeout:  {type: String},
  active_status:  {type: String},
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
