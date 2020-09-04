import mongoose from 'mongoose';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    min: 0,
  },
  lastModified: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const studentModel = mongoose.model('student', studentSchema, 'student');

export { db, studentModel };
