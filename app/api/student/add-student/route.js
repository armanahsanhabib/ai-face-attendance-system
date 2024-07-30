import Student from '@/app/models/student'
import { dbConnect, dbDisconnect } from '@/app/util/db'
import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

// Ensure the directory exists
const uploadDir = path.join(process.cwd(), 'public/images/students')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

export async function GET() {
  try {
    await dbConnect()
    const students = await Student.find({})
    return NextResponse.json(students)
  } catch (error) {
    console.error('Failed to fetch students:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 },
    )
  } finally {
    dbDisconnect()
  }
}

export async function POST(req) {
  try {
    // Parse form data from request
    const formData = await req.formData()

    // Extract file from form data
    const file = formData.get('photo')

    // Create a new instance of FormData
    const newFormData = new FormData()

    // Add form data
    formData.forEach((value, key) => {
      if (key !== 'photo') {
        newFormData.append(key, value)
      }
    })

    // Handle file upload
    if (file) {
      const studentId = formData.get('id')
      if (!studentId) {
        throw new Error('Student ID is required for file upload')
      }

      const filePath = `${studentId}${path.extname(file.name)}`
      const fileBuffer = Buffer.from(await file.arrayBuffer())
      const savePath = path.join(uploadDir, filePath)
      fs.writeFileSync(savePath, fileBuffer)

      // Add file path to form data
      newFormData.append('photo', `images/students/${filePath}`)
    }

    await dbConnect()
    const body = Object.fromEntries(newFormData.entries())
    await Student.create(body)

    return NextResponse.json({ message: 'Student Added!' })
  } catch (error) {
    console.error('Failed to add student:', error)
    return NextResponse.json(
      { error: 'Failed to add student' },
      { status: 500 },
    )
  } finally {
    dbDisconnect()
  }
}
