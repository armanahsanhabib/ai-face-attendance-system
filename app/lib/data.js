'use server'

import Student from '@/app/models/student'
import { dbConnect, dbDisconnect } from '@/app/util/db'
import Teacher from '../models/teacher'

export async function fetchStudent(_id) {
  try {
    await dbConnect()
    const student = await Student.findById(_id).lean()
    if (!student) {
      return { error: 'Student not found', status: 404 }
    }
    student._id = student._id.toString()
    return student
  } catch (error) {
    console.error('Failed to fetch student:', error)
    return { error: 'Failed to fetch student', status: 500 }
  } finally {
    dbDisconnect()
  }
}

export async function fetchAllStudents(dept, sem, sec, id) {
  try {
    await dbConnect()
    const query = {}
    if (dept) query.dept = dept
    if (sem) query.sem = sem
    if (sec) query.sec = sec
    if (id) query.id = id

    const students = await Student.find(query).lean().sort({ id: 1 })

    if (!students) {
      return { error: 'Students not found', status: 404 }
    }

    const studentsWithStringId = students.map((student) => ({
      ...student,
      _id: student._id.toString(),
    }))

    return studentsWithStringId
  } catch (error) {
    console.error('Failed to fetch students:', error)
    return { error: 'Failed to fetch students', status: 500 }
  } finally {
    dbDisconnect()
  }
}

export async function fetchAllStudentIds() {
  try {
    await dbConnect()
    const students = await Teacher.find({}, { id: 1, _id: 0 }).lean() // Fetch only the id field
    if (!students || students.length === 0) {
      return { error: 'No students found', status: 404 }
    }
    const studentIds = students.map((student) => student.id)
    return studentIds
  } catch (error) {
    console.error('Failed to fetch student IDs:', error)
    return { error: 'Failed to fetch student IDs', status: 500 }
  } finally {
    dbDisconnect()
  }
}

export async function fetchAllTeachers(dept) {
  try {
    await dbConnect()
    const query = {}
    if (dept) query.dept = dept

    const teachers = await Teacher.find(query).lean().sort({ _id: -1 })

    if (!teachers) {
      return { error: 'Teachers not found', status: 404 }
    }

    const teachersWithStringId = teachers.map((student) => ({
      ...student,
      _id: student._id.toString(),
    }))

    return teachersWithStringId
  } catch (error) {
    console.error('Failed to fetch teachers:', error)
    return { error: 'Failed to fetch teachers', status: 500 }
  } finally {
    dbDisconnect()
  }
}
