// models/student.js
import mongoose from 'mongoose'

// Define the Student schema
const courseSchema = new mongoose.Schema({
  dept: {
    type: String,
    required: true,
  },
  sem: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    unique: true,
  },
  code: {
    type: String,
    unique: true,
  },
  credit: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
})

// Check if the model already exists to prevent redefinition
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema)

export default Course
