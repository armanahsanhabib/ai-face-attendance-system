'use server'

import Student from '@/app/models/student'
import Teacher from '@/app/models/teacher'
import { dbConnect, dbDisconnect } from '@/app/util/db'

export async function addStudent(formData) {
  try {
    await dbConnect()
    const newStudent = await Student.create(formData)

    return {
      message: 'Student added successfully!',
      status: 200,
      id: newStudent._id.toString(),
    }
  } catch (error) {
    console.error('Failed to add student:', error)
    return { error: 'Failed to add student!', status: 500 }
  } finally {
    dbDisconnect()
  }
}

export async function updateStudent(id, formData) {
  try {
    await dbConnect()
    const result = await Student.findByIdAndUpdate(id, formData)

    if (!result) {
      return { error: 'Student not found', status: 404 }
    }

    return { message: 'Student updated successfully!', status: 200 }
  } catch (error) {
    console.error('Failed to update student:', error)
    return { error: 'Failed to update student!', status: 500 }
  } finally {
    dbDisconnect()
  }
}

export async function removeStudent(id) {
  try {
    await dbConnect()
    const result = await Student.findByIdAndDelete(id)

    if (!result) {
      return { error: 'Student not found', status: 404 }
    }

    return { message: 'Student removed successfully!', status: 200 }
  } catch (error) {
    console.error('Failed to remove student:', error)
    return { error: 'Failed to remove student!', status: 500 }
  } finally {
    dbDisconnect()
  }
}

export async function addTeacher(formData) {
  try {
    await dbConnect()
    const newTeacher = await Teacher.create(formData)

    return {
      message: 'Teacher added successfully!',
      status: 200,
      id: newTeacher._id.toString(),
    }
  } catch (error) {
    console.error('Failed to add teacher:', error)
    return { error: 'Failed to add teacher!', status: 500 }
  } finally {
    dbDisconnect()
  }
}

export async function removeTeacher(id) {
  try {
    await dbConnect()
    const result = await Teacher.findByIdAndDelete(id)

    if (!result) {
      return { error: 'Teacher not found', status: 404 }
    }

    return { message: 'Teacher removed successfully!', status: 200 }
  } catch (error) {
    console.error('Failed to remove teacher:', error)
    return { error: 'Failed to remove teacher!', status: 500 }
  } finally {
    dbDisconnect()
  }
}
