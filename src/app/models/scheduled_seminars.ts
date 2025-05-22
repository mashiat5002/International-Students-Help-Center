import mongoose, { Schema, Document } from "mongoose";
export interface IScheduledSeminars extends Document {
    expert_id: string;
    meeting_topic: string;
    Creation_time: {type:Date };
    Scheduled_time: string;
    max_Participants: string;
    registed_participants: string;
    duration: string;

   
}

const ScheduledSeminarsSchema = new Schema<IScheduledSeminars>({
    expert_id: {type:String, required:true},
    meeting_topic: {type:String, required:true},
    Creation_time: {type:Date , default: Date.now},
    Scheduled_time: {type:String ,required:true},
    max_Participants: {type:String},
    registed_participants: {type:String,default:"0"},
    duration: {type:String}
});

const ScheduledSeminars = mongoose.models.ScheduledSeminars || mongoose.model("ScheduledSeminars", ScheduledSeminarsSchema);
export default ScheduledSeminars;
