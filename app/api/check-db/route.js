import Student from '@/app/models/student'
import { dbConnect, dbDisconnect } from '@/app/util/db'
import { NextResponse } from 'next/server'

export async function GET() {
  await dbConnect()
  const students = await Student.find({})
  dbDisconnect()
  return new NextResponse(students)
}
