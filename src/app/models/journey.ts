// models/progress_track.ts
import mongoose from 'mongoose';
const StepSchema = new mongoose.Schema({
  title: String,
  note: String,
  description: String,
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'not-started'],
    default: 'not-started',
  },
  doc_name: String,
  document: Buffer,
  uploadDate: {type: Date},
});

const JourneySchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: String,
  description: String,
  totalSteps: Number,
  currentStep: Number,
  lastUpdated: Date,
  institution: String,
  program: String,
  deadline: Date,
  steps: [StepSchema]
});

const Journey = mongoose.models.Journey || mongoose.model('Journey', JourneySchema);
export default Journey; // ✅ MUST use default export
