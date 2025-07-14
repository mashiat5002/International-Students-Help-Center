import React, { useEffect, useRef, useState } from "react";
import { call_fetch_specific_doc } from "../../../lib/auth/fetch_specific_doc";
import prepare_and_view from "../(utils)/prepare_and_view/prepare_and_view";
import { call_push_note_on_journey_step } from "../../../lib/auth/call_push_note_on_journey_step";
import LoadingSpinner from "./common/LoadingSpinner";

// Define types for the fetched data
 type Step = {
  _id: string;
  title: string;
  description: string;
  status: string;
  document?: data;
};
type data={
  data:Buffer
}
// Define type for data2
 type MeetingTask = {
  _id: string;
  journey_id: string;
  Institution: string;
  fieldOfStudy: string;
  ApplyingOn: string;
  meeting_topic: string;
  Scheduled_time: string;
};

// NoteModal component
const NoteModal = ({
  open,
  onClose,
  onSend,
  value,
  setValue,
}: {
  open: boolean;
  onClose: () => void;
  onSend: () => void;
  value: string;
  setValue: (v: string) => void;
}) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-4">Add Note</h2>
        <textarea
          className="w-full border rounded-lg p-2 mb-4 min-h-[100px] resize-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your note here..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
          onClick={onSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export const Video_call_Documets_review = ({ roomId ,send_note,myObject,setMyObject,setmeetingTopic}: { roomId: string, send_note: (note: string, idx: string) => void,setmeetingTopic:React.Dispatch<React.SetStateAction<string>> ,myObject:any,setMyObject:React.Dispatch<React.SetStateAction<{}>>}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [meetingTasks, setMeetingTasks] = useState<MeetingTask[]>([]);
  // Modal state
  const [loadingdocDetails, setloadingdocDetails] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const [noteStepIndex, setNoteStepIndex] = useState<number | null>(null);

  useEffect(() => {
    const callfun = async () => {
      setloadingdocDetails(true)
      const res = await call_fetch_specific_doc("685e6f2d0ff9cb5151eff4c3");
      setloadingdocDetails(false)
      
      
      const result = res?.data?.[0]?.steps
        .map((item: any, index: number) => {
          if (item.note) {
            
              setMyObject(prev => ({
              ...prev,         // keep all existing keys
              [index]: item.note  // add a new key "country"
            }));


          }
          return null;
        })
        .filter((item: any) => item !== null); // remove nulls






      if (res?.data?.[0]?.steps) {
        setSteps(res.data[0].steps);
      }
      if (res?.data2) {
        setMeetingTasks(res.data2);
        setmeetingTopic(res.data2[0].meeting_topic)
      }
    };
    callfun();
  }, []);

  // Function to handle sending the note
  const handleSendNote = () => {
    if (noteStepIndex !== null) {
      // Call your function here, e.g.:
      // sendNoteToStep(noteStepIndex, noteInput);
      console.log("Send note for step index:", noteStepIndex, "Note:", noteInput);
      send_note(noteInput,noteStepIndex.toString())
      // Reset modal state
      setNoteModalOpen(false);
      setNoteInput("");
      setNoteStepIndex(null);
    }


    const res= call_push_note_on_journey_step("685e6f2d0ff9cb5151eff4c3",noteStepIndex?.toString(), noteInput )



  };

  return (
    <>
      {/* Note Modal */}
      <NoteModal
        open={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        onSend={handleSendNote}
        value={noteInput}
        setValue={setNoteInput}
      />

      {/* Meeting Task List section */}
      <div className="bg-gray-900 rounded-2xl p-4 text-white shadow mb-6">
        <h3 className="font-semibold mb-2">Meeting Task List  {loadingdocDetails?"(Loading...)":null}</h3>
        <ul className="space-y-3">
          {meetingTasks.map((task, i) => (
            <li key={task._id} className="flex flex-col gap-1 bg-gray-800 rounded-lg p-3">
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <span className="font-semibold" title={task.Institution}>Institution: {task.Institution}</span>
                <span className="font-semibold" title={task.fieldOfStudy}>Field: {task.fieldOfStudy}</span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <span title={task.ApplyingOn}>Applying On: {task.ApplyingOn}</span>
                <span title={task.meeting_topic}>Meeting Topic: {task.meeting_topic}</span>
                <span title={task.Scheduled_time}>Scheduled Time: {task.Scheduled_time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Documents To Review section */}
      <div className="bg-white rounded-2xl p-4 shadow flex flex-col flex-1">
        <h3 className="font-semibold mb-2">Documents To Review</h3>
        {loadingdocDetails?<LoadingSpinner/>:<div className="flex-1 space-y-3 overflow-x-auto">
          {steps.map((step, idx) => (
            <div
              key={step._id}
              className="grid grid-cols-12 gap-2 items-center bg-gray-50 rounded-lg px-3 py-2 min-w-[320px]"
            >
              <span
                className="col-span-3 font-medium text-sm break-words whitespace-normal"
                title={step.title}
              >
                {step.title}
              </span>
              <span
                className="col-span-5 text-xs text-gray-500 break-words whitespace-normal"
                title={step.description}
              >
                {step.description}
              </span>
              <div className="col-span-4 flex space-x-2 items-center justify-end">

                {step.document ? 
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold transition-colors duration-150 shadow-sm"
                    onClick={() => prepare_and_view(step.document!.data!)}
                    title="Open Document"
                  >
                    Open
                  </button>:
                  <button
                    className="bg-gray-500 cursor-default  text-white px-4 py-1 rounded-full text-xs font-semibold transition-colors duration-150 shadow-sm"
                    
                    title="No Uploads"
                  >
                    N/A
                  </button>
                }



                {
                  myObject[idx]?<button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded-full text-xs font-semibold transition-colors duration-150 shadow-sm"
                  title="view Note"
                  onClick={() => {
                    setNoteModalOpen(true);
                    setNoteStepIndex(idx);
                    setNoteInput(myObject[idx])
                  }}
                >
                  view Note
                </button>:
                  <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded-full text-xs font-semibold transition-colors duration-150 shadow-sm"
                  title="Add Note"
                  onClick={() => {
                    setNoteModalOpen(true);
                    setNoteStepIndex(idx);
                    setNoteInput("")
                    
                  }}
                >
                  Add Note
                </button>
                }
                
                {/* ...status (if needed)... */}
              </div>
            </div>
          ))}
        </div>}
      </div>
    </>
  );
}
