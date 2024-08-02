'use client'

import { updateStudent } from '@/app/lib/actions'
import { fetchStudent } from '@/app/lib/data'
import axios from 'axios'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import path from 'path'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const _id = searchParams.get('_id')

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchStudent(_id)
      if (response._id) {
        setFormData(response)
      }
    }

    fetchData()
  }, [_id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, photo: file })
    }
  }

  const handleUpdate = async () => {
    try {
      let result
      if (!(formData.photo instanceof File)) {
        // Update without photo
        result = await updateStudent(_id, formData)
      } else {
        // Update with new photo name
        const updatedFormData = { ...formData }
        const extName = path.extname(formData.photo.name).toLowerCase()
        updatedFormData.photo = `${formData.id}${['.jpeg', '.jpg', '.png'].includes(extName) ? '.jpg' : extName}`

        // Update student information with new photo name
        result = await updateStudent(_id, updatedFormData)

        // Upload the photo file
        const photoFormData = new FormData()
        photoFormData.append('photo', formData.photo)
        photoFormData.append('id', formData.id)

        try {
          await axios.post('/api/upload-student-photo', photoFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        } catch (error) {
          console.error('Failed to upload photo:', error)
          throw new Error('Failed to upload photo')
        }
      }

      if (result.status !== 200) {
        throw new Error(result.error || 'Failed to update student')
      }

      toast.success('Student updated successfully!', {
        position: 'bottom-center',
        autoClose: 3000,
      })
      router.push('/admin/students')
    } catch (error) {
      console.error('Update failed:', error)
      toast.error('Failed to update student.', {
        position: 'bottom-center',
        autoClose: 3000,
        theme: 'dark',
      })
    }
  }

  return (
    <Suspense>
      <div>
        <div className="header mb-4 flex items-center justify-between border-b pb-2">
          <h1 className="text-lg font-medium text-blue-600">Update Student</h1>
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
          <h3 className="mb-4 font-medium text-blue-600">
            Student Details Form
          </h3>
          <form className="flex flex-col gap-5">
            <div className="selection_row grid grid-cols-3 gap-5">
              <div className="group flex items-center gap-5">
                <label htmlFor="dept">Department:</label>
                <select
                  name="dept"
                  id="dept"
                  className="flex-grow rounded border px-2 py-1 text-sm outline-none"
                  value={formData.dept}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="cse">CSE</option>
                  <option value="eee">EEE</option>
                  <option value="civil">Civil</option>
                  <option value="mechanical">Mechanical</option>
                  <option value="english">English</option>
                  <option value="bba">BBA</option>
                </select>
              </div>
              <div className="group flex items-center gap-5">
                <label htmlFor="sem">Semester:</label>
                <select
                  name="sem"
                  id="sem"
                  className="flex-grow rounded border px-2 py-1 text-sm outline-none"
                  value={formData.sem}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                  <option value="6th">6th</option>
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                </select>
              </div>
              <div className="group flex items-center gap-5">
                <label htmlFor="sec">Section:</label>
                <select
                  name="sec"
                  id="sec"
                  className="flex-grow rounded border px-2 py-1 text-sm outline-none"
                  value={formData.sec}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            </div>
            <div className="input_items flex flex-col gap-5">
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
                  onChange={handleInputChange}
                  placeholder="Enter Student Id..."
                  required
                />
              </div>
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
                  onChange={handleInputChange}
                  placeholder="Enter name..."
                  required
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
                  onChange={handleInputChange}
                  placeholder="Enter phone..."
                  required
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
                  onChange={handleInputChange}
                  placeholder="Enter email..."
                  required
                />
              </div>
              <div className="group flex items-center gap-8">
                <label htmlFor="photo" className="w-32">
                  Student Photo:
                </label>
                <input
                  name="photo"
                  id="photo"
                  type="file"
                  onChange={handleImageChange}
                  className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="group relative mx-auto flex w-40 items-center justify-center gap-8">
                {formData.photo instanceof File ? (
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="photo"
                    className="aspect-square border bg-white object-cover p-1"
                  />
                ) : (
                  formData.photo && (
                    <img
                      src={`/images/students/${formData.photo}`}
                      alt="photo"
                      className="aspect-square border bg-white object-cover p-1"
                    />
                  )
                )}
              </div>
              <div className="group flex items-center justify-center gap-8">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="cursor-pointer rounded-lg border bg-amber-500 px-5 py-2 font-medium text-white hover:bg-amber-600"
                >
                  Update Student
                </button>
                <Link
                  href="/admin/students"
                  className="cursor-pointer rounded-lg border bg-emerald-500 px-8 py-2 font-medium text-white hover:bg-emerald-600"
                >
                  {'Cancel'}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  )
}

export default Page
