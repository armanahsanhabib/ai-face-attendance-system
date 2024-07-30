// models/student.js
import mongoose from 'mongoose'

// Define the Student schema
const teacherSchema = new mongoose.Schema({
  dept: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  designation: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
})

// Check if the model already exists to prevent redefinition
const Teacher =
  mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema)

export default Teacher
