// models/student.js
import mongoose from 'mongoose'

// Define the Student schema
const studentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dept: {
    type: String,
    required: true,
  },
  sem: {
    type: String,
    required: true,
  },
  sec: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
})

// Check if the model already exists to prevent redefinition
const Student =
  mongoose.models.Student || mongoose.model('Student', studentSchema)

export default Student
