import mongoose, { Schema, Document } from "mongoose";

export interface IExpert extends Document {
    email: string;
    full_name: string;
    about: string;
    img: string;
    password: string;
    social_media_link1: string;
    social_media_link2: string;
    social_media_link3: string;
    profession: string;
    institution: string;
    country: string;
    varification_key: string;
    varify_timeout: string;
    active_status: string;
    joined: string;
    rating: string;
    status: string;
}

const ExpertSchema = new Schema<IExpert>({
  email: { type: String,  },
  full_name:  {type: String},
  img:  {type: String, default: "https://www.gravatar.com/avatar/?d=mp"},
  password:  {type: String},
  about:  {type: String,default:"Not Provided"},
  profession:  {type: String,default:"Not Provided"},
  institution:  {type: String,default:"Not Provided"},
  social_media_link1:  {type: String,default:"Not Provided"},
  social_media_link2:  {type: String,default:"Not Provided"},
  social_media_link3:  {type: String,default:"Not Provided"},
  country:  {type: String,default:"Not Provided"},
  varification_key:  {type: String},
  varify_timeout:  {type: String},
  active_status:  {type: String},
  joined:  {type: String, default:new Date().toLocaleString('default', { month: 'long' })+" "+new Date().getFullYear()},
  rating:  {type: String, default:"0"},
  status:  {type: String, default:"Unblocked"},
});

const Expert = mongoose.models.Expert || mongoose.model("Expert", ExpertSchema);
export default Expert;
