import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
    full_name: string;
    email: string;
    img: string;
    password: string;
 
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String,  },
  full_name:  {type: String},
  img:  {type: String, default:"https://www.gravatar.com/avatar/?d=mp"},
  password:  {type: String},

});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
export default Admin;
