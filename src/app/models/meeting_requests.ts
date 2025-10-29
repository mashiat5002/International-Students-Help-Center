import mongoose, { Schema, Document } from "mongoose";
export interface IMeetingRequests extends Document {
    expert_id: string;
    student_email: string;
    student_full_name: string;
    expert_full_name: string;
    ApplyingOn: string;
    journey_id: string;
    Institution: string;
    fieldOfStudy: string;
    meeting_topic: string;
    Request_time: {type:Date };
    Scheduled_time: string;

   
}

const MeetingRequestsSchema = new Schema<IMeetingRequests>({
    expert_id: {type:String, required:true},
    journey_id: {type:String, required:true}, 
    expert_full_name: {type:String},
    Institution: {type:String},
    fieldOfStudy: {type:String},
    ApplyingOn: {type:String},
    meeting_topic: {type:String, required:true},
    student_email: {type:String, required:true},
    student_full_name: {type:String},
    Request_time: {type:Date , default: Date.now},
    Scheduled_time: {type:String , default: "Not Scheduled"},
});

const MeetingRequests = mongoose.models.MeetingRequests || mongoose.model("MeetingRequests", MeetingRequestsSchema);
export default MeetingRequests;
