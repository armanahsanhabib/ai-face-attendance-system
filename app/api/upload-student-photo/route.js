import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

const uploadDir = path.join(process.cwd(), 'public/images/students')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('photo')
    const studentId = formData.get('id')

    if (!file || !studentId) {
      throw new Error('Photo and student ID are required for file upload')
    }

    const extName = path.extname(file.name).toLowerCase()
    const fileName = `${studentId}${['.jpeg', '.jpg', '.png'].includes(extName) ? '.jpg' : extName}`
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const savePath = path.join(uploadDir, fileName)
    fs.writeFileSync(savePath, fileBuffer)

    return NextResponse.json(
      { message: 'File uploaded successful!' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to upload file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 },
    )
  }
}

// DELETE request to handle file deletion
export async function DELETE(req) {
  try {
    const { fileName } = await req.json()

    if (!fileName) {
      return NextResponse.json(
        { error: 'File name is required for deletion' },
        { status: 400 },
      )
    }

    const absolutePath = path.join(
      process.cwd(),
      'public/images/students',
      fileName,
    )

    // Check if the file exists
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath)
      return NextResponse.json({ message: 'File deleted successfully' })
    } else {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Failed to delete file:', error)
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 },
    )
  }
}
