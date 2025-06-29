import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    full_name: string;
    email: string;
    institution: string;
    country: string;
    preferred_field_of_study: string;
    preferred_level_of_study: string;
    bio: string;
    enable_email: boolean;
    is_expert: boolean;
    password: string;
    phone: string;
    varification_key: string;
    varify_timeout: string;
    active_status: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String,  },
  full_name:  {type: String},
  is_expert:  {type: Boolean, default: false},
  institution:  {type: String},
  country:  {type: String},
  preferred_field_of_study:  {type: String},
  preferred_level_of_study:  {type: String},
  bio:  {type: String},
  password:  {type: String},
  enable_email:  {type: Boolean, default: true},
  phone:  {type: String},
  varification_key:  {type: String},
  varify_timeout:  {type: String},
  active_status:  {type: String},
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
