import mongoose, { Schema, Document } from "mongoose";
interface ParticipantsDetails  {
    email: string,
    name: string,
    motive: string
}
export interface IScheduledSeminars extends Document {
    expert_id: string;
    speaker: string;
    description: string;
    meeting_topic: string;
    Creation_time: Date ;
    Scheduled_time: Date;
    max_Participants: string;
    registed_participants: number;
    duration: string;
    status: string;
    topics: string[];
    participants: ParticipantsDetails[];

   
}
const ParticipantsDetailsSchema = new Schema<ParticipantsDetails>({
    email: { type: String, required: true   },
    name: { type: String, required: true },
    motive: { type: String, required: true },

}, { _id: false });


const ScheduledSeminarsSchema = new Schema<IScheduledSeminars>({
    expert_id: {type:String, required:true},
    speaker: {type:String, required:true},
    description: {type:String, required:true},
    meeting_topic: {type:String, required:true},
    Creation_time: {type:Date , default: Date.now},
    Scheduled_time: {type:Date ,required:true},
    max_Participants: {type:String},
    registed_participants: {type:Number,default:0},
    duration: {type:String},
    status: {type:String, default:"upcoming"},
    topics: {type:[String]},
    participants: {type:[ParticipantsDetailsSchema], default: []},
});

const ScheduledSeminars = mongoose.models.ScheduledSeminars || mongoose.model("ScheduledSeminars", ScheduledSeminarsSchema);
export default ScheduledSeminars;
