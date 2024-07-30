'use client'

import { removeStudent } from '@/app/lib/actions'
import { fetchStudent } from '@/app/lib/data'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const _id = searchParams.get('_id')

  useEffect(() => {
    const fetchData = async () => {
      const studentData = await fetchStudent(_id)
      setFormData(studentData)
    }

    fetchData()
  }, [])

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    dept: '',
    sem: '',
    sec: '',
    photo: null,
  })

  const handleDelete = async () => {
    try {
      const photoDeletionResult = await axios.delete(
        '/api/upload-student-photo',
        {
          data: { fileName: formData.photo },
        },
      )

      if (photoDeletionResult.status !== 200) {
        throw new Error(photoDeletionResult.data.error)
      }

      // If photo deletion is successful, delete the student record
      const studentDeletionResult = await removeStudent(_id)

      if (studentDeletionResult.status !== 200) {
        throw new Error(studentDeletionResult.error)
      }

      // Notify success
      toast.success('Student deleted successfully.', {
        position: 'bottom-center',
        autoClose: 3000,
      })

      router.push('/admin/students')
    } catch (error) {
      console.error('Error deleting student or photo:', error)
      toast.error('Failed to delete student and/or photo.', {
        position: 'bottom-center',
        autoClose: 3000,
      })
    }
  }

  return (
    <div>
      <div className="header mb-4 flex items-center justify-between border-b pb-2">
        <h1 className="text-lg font-medium text-rose-600">Delete Student</h1>
        <div className="buttons">
          <Link
            href="/admin/students"
            className="rounded border border-blue-300 bg-sky-200 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            {'< Go Back'}
          </Link>
        </div>
      </div>
      <div className="container mx-auto max-w-3xl rounded-lg border bg-gray-50 p-5">
        <h3 className="mb-4 font-medium text-blue-600">Student Details:</h3>

        <form className="mt-5 flex flex-col gap-8">
          <div className="flex gap-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_URL}/images/students/${formData.photo}`}
              alt={formData.id}
              width={120}
              height={120}
              priority={true}
              className="h-36 w-36 rounded-md border bg-white object-cover p-2"
            />
            <div className="details flex flex-grow flex-col gap-1 rounded-md border bg-white px-3 py-2">
              <h1 className="text-lg font-bold text-blue-600">
                Name: {formData.name}
              </h1>
              <p className="text-sm text-gray-500">Student ID: {formData.id}</p>
              <p className="text-sm text-gray-500">
                Department: {formData.dept}
              </p>
              <p className="text-sm text-gray-500">Semester: {formData.sem}</p>
              <p className="text-sm text-gray-500">Section: {formData.sec}</p>
            </div>
          </div>
          <div className="input_items flex flex-col gap-5">
            <div className="group flex items-center gap-8">
              <label htmlFor="name" className="w-32">
                Student Name:
              </label>
              <input
                name="name"
                id="name"
                type="text"
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={formData.name}
                readOnly
              />
            </div>
            <div className="group flex items-center gap-8">
              <label htmlFor="id" className="w-32">
                Student ID:
              </label>
              <input
                name="id"
                id="id"
                type="text"
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={formData.id}
                readOnly
              />
            </div>
            <div className="group flex items-center gap-8">
              <label htmlFor="phone" className="w-32">
                Phone Number:
              </label>
              <input
                name="phone"
                id="phone"
                type="text"
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={formData.phone}
                readOnly
              />
            </div>
            <div className="group flex items-center gap-8">
              <label htmlFor="email" className="w-32">
                Email Address:
              </label>
              <input
                name="email"
                id="email"
                type="email"
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={formData.email}
                readOnly
              />
            </div>
          </div>
          <div className="group flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={handleDelete}
              className="cursor-pointer rounded-lg border bg-rose-500 px-5 py-2 font-medium text-white hover:bg-rose-600"
            >
              Confirm Delete
            </button>
            <Link
              href="/admin/students"
              className="cursor-pointer rounded-lg border bg-emerald-500 px-8 py-2 font-medium text-white hover:bg-emerald-600"
            >
              {'Cancel'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
