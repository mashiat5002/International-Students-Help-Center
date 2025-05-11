import mongoose, { Schema, Document } from "mongoose";

export interface IExpert extends Document {
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

const ExpertSchema = new Schema<IExpert>({
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

const Expert = mongoose.models.Expert || mongoose.model("Expert", ExpertSchema);
export default Expert;
