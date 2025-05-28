import { ObjectId } from 'mongoose';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Toast from './common/Toast';
import { call_schedule_seminar } from '../(utils)/call_schedule_seminar/route';


type details={
    _id: ObjectId,
    expert_id: string,
    Institution: string,
    fieldOfStudy: string,
    ApplyingOn: string,
    meeting_topic: string,
    student_email: string,
    student_full_name: string,
    Scheduled_time: string,
    Request_time: string,
    __v: Number
}
const SeminarSchedulingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rerender, setrerender] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [IsDate_Time_given, setIsDate_Time_given] = useState(true);
  const [toastType, settoastType] = useState("");
  const [toastMessage, setToastMessage] = useState('');
  const [selectedDateTimes, setSelectedDateTimes] = useState<{[key: string]: Date | null}>({});
  const [seminarTopic, setSeminarTopic] = useState('');
  const [seminarDescription, setSeminarDescription] = useState('');
  const [seminarDuration, setSeminarDuration] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [topicsCovered, setTopicsCovered] = useState<string[]>(['']);
  

  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...topicsCovered];
    newTopics[index] = value;
    setTopicsCovered(newTopics);
  };

  const addTopicField = () => {
    setTopicsCovered([...topicsCovered, '']);
  };

  const removeTopicField = (index: number) => {
    if (topicsCovered.length > 1) {
      const newTopics = topicsCovered.filter((_, i) => i !== index);
      setTopicsCovered(newTopics);
    }
  };

  const handleDateTimeChange = (id: string, value: Date | null) => {
    setSelectedDateTimes(prev => ({ ...prev, [id]: value }));
  };

  const handleConfirm = async(id: string) => {
    const selected = selectedDateTimes[id];
    
    if(!selected){
      setIsDate_Time_given(false)
      return
    }else{
      setIsDate_Time_given(true)
    }
    // Filter out empty topics
    const filteredTopics = topicsCovered.filter(topic => topic.trim() !== '');
    // Create a seminar object that includes topics
    const seminarData = {
      topic: seminarTopic,
      description: seminarDescription,
      dateTime: selected,
      duration: seminarDuration,
      maxParticipants: maxParticipants,
      topics: filteredTopics
    };
    const res = await call_schedule_seminar(seminarData);
    console.log('Seminar data:', seminarData);
    
    setIsLoading(false);
    if( res.message=="ScheduledSeminars saved successfully"){
      setSeminarTopic('');
      setSeminarDescription('');
      setSeminarDuration('');
      setMaxParticipants('');
      setSelectedDateTimes({});
      setTopicsCovered(['']);

      settoastType("success")
      setToastMessage("Seminar Is Scheduled");
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
    }
    else {
      settoastType("failed")
      setToastMessage(res.message);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
    }
  };

 


  return (
    <>
    <div className="h-fit custom-scrollbar    w-full max-w-2xl mx-auto mt-10 p-6 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md">
      <h2 className="text-2xl font-bold text-white mb-6">Schedule Seminar</h2>
      
      <ul className="space-y-4">
        
          <li className="flex flex-col md:flex-row md:items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex-1">
              {/* Seminar form fields */}
              <div className="mb-4">
                <label className="block text-white font-medium mb-1">Seminar Topic</label>
                <input
                  type="text"
                  value={seminarTopic}
                  onChange={e => setSeminarTopic(e.target.value)}
                  className={`w-full rounded-lg border ${toastMessage=="Must Provide Seminar Topic" || toastMessage=="Must Not Cross Character limit in Topic"?"ring-2 ring-red-500":"border-gray-300"} px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter seminar topic (Maximum Character 100)"
                  maxLength={100}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={seminarDescription}
                  onChange={e => setSeminarDescription(e.target.value)}
                  className={`w-full rounded-lg border ${toastMessage=="Must Provide Seminar description" || toastMessage=="Must Not Cross Character limit in description"?"ring-2 ring-red-500":"border-gray-300"} px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter seminar topic (Maximum Character 250)"
                  maxLength={250}
                />
              </div>

              {/* Topics Covered Section */}
              <div className="mb-4">
                <label className="block text-white font-medium mb-1">Topics Covered</label>
                <div className="space-y-2">
                  {topicsCovered.map((topic, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => handleTopicChange(index, e.target.value)}
                        className={`${toastMessage=="Must Provide at least one topic"?"ring-2 ring-red-500":"border-gray-300"} w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder={`Topic ${index + 1}`}
                      />
                      {topicsCovered.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTopicField(index)}
                          className="px-3 py-2 text-red-400 hover:text-red-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTopicField}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Topic
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-white font-medium mb-1">Seminar Duration (minutes)</label>
                <input
                  type="number"
                  min="1"
                  value={seminarDuration}
                  onChange={e => setSeminarDuration(e.target.value)}
                  className={`${toastMessage=="Must Provide Seminar Duration"||toastMessage=="Must Provide a Valid Seminar Duration"?"ring-2 ring-red-500":""} w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter duration in minutes"
                />
              </div>
              <div className="mb-4 ">
                <label className="block text-white font-medium mb-1">Maximum Participants</label>
                <input
                  type="number"
                  min="1"
                  value={maxParticipants}
                  onChange={e => setMaxParticipants(e.target.value)}
                  className= {`${toastMessage=="Must Provide Max Participants Allowed"||toastMessage=="Must Provide a Valid Max Participants Allowed"?"ring-2 ring-red-500":""} w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter max Participants"
                />
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2 items-end">
             <DatePicker
                selected={selectedDateTimes[String("item._id")] || null}
                onChange={date => handleDateTimeChange(String("item._id"), date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select date & time"
                className={` ${IsDate_Time_given||toastMessage=="Must Provide Valid Date-time"?"":"ring-2 ring-red-400"} rounded-lg ring-2  px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow`}
                calendarClassName="!bg-white !rounded-xl !shadow-lg !border !border-gray-200"
                popperPlacement="bottom-end"
                minDate={new Date()}
                minTime={
                  (!selectedDateTimes[String("item._id")] ||
                    selectedDateTimes[String("item._id")]?.toDateString() === new Date().toDateString())
                    ? (() => {
                        const now = new Date();
                        now.setSeconds(0, 0);
                        const remainder = 15 - (now.getMinutes() % 15);
                        if (remainder !== 15) now.setMinutes(now.getMinutes() + remainder);
                        return now;
                      })()
                    : new Date(0, 0, 0, 0, 0)
                }
                maxTime={new Date(0, 0, 0, 23, 45)}
              />
            

              
              <button
                className={ ` mt-2 ml-4 px-5 py-2  text-white rounded-full bg-blue-800 font-medium shadow hover:bg-blue-700 transition`}
                onClick={() => {handleConfirm(String("item._id"))}}
              >
                Confirm
              </button>
             
            </div>
          </li>
       
      </ul>
    </div>
      {showToast&&<Toast
          type={toastType}
          message={toastMessage}
        />}
    </>
  );
};

export default SeminarSchedulingForm; 