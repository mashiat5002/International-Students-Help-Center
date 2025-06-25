import mongoose, { Schema, Document } from "mongoose";

export interface IApplication_Links extends Document {
  journeyId: string;
  title: string;
  institution: string;
  program: string;
  deadline: string;
  applicationUrl: string;
  emailAddresses: {
    admissions: string;
    department: string;
    international: string;
  };
  requirements: string[];
  documents: string[];
  tips: string[];
  additionalResources: {
    title: string;
    url: string;
    description: string;
  }[];
}

const IApplication_LinksSchema = new Schema<IApplication_Links>({
    journeyId: { type: String},
  title: { type: String},
  institution: { type: String},
  program: { type: String},
  deadline: { type: String},
  applicationUrl: { type: String},
  emailAddresses: {
    admissions: { type: String},
    department: { type: String},
    international: { type: String},
  },
  requirements: { type: [String]},
  documents: { type: [String]},
  tips: { type: [String]},
  
  additionalResources: [{
    title: { type: String},
    url: { type: String},
    description: { type: String},
  }],
});

const Application_Links = mongoose.models.Application_Links || mongoose.model("Application_Links", IApplication_LinksSchema);
export default Application_Links;
