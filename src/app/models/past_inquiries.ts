import mongoose, { Schema, Document } from "mongoose";
export interface IPast_inquiries extends Document {
 
    date: Date;
    heading: string;
    questions: string[];
    answers: string[];
   
   
}

const Past_inquiriesSchema = new Schema<IPast_inquiries>({
 
    date: {type:Date, default: Date.now},
    heading: {type:String},
    questions: {type: [String]},
    answers: {type: [String]},
   
});

const Past_inquiries = mongoose.models.Past_inquiries || mongoose.model("Past_inquiries", Past_inquiriesSchema);
export default Past_inquiries;
