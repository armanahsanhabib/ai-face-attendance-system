'use client'

import { addStudent, removeStudent } from '@/app/lib/actions'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import path from 'path'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    dept: '',
    sem: '',
    sec: '',
  })
  const [photo, setPhoto] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setPhoto(file)
  }

  const handleImageRemove = () => {
    const fileInput = document.getElementById('photo')
    fileInput.value = null

    setPhoto(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const extName = path.extname(photo.name).toLowerCase()
      formData.photo = `${formData.id}${['.jpeg', '.jpg', '.png'].includes(extName) ? '.jpg' : extName}`
      const result = await addStudent(formData)

      if (result.status !== 200) {
        throw new Error(result.error)
      }

      const photoFormData = new FormData()
      photoFormData.append('photo', photo)
      photoFormData.append('id', formData.id)

      try {
        await axios.post('/api/upload-student-photo', photoFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      } catch (error) {
        await removeStudent(result.id)
        throw new Error('Failed to upload photo')
      }

      console.log(result.message)
      toast.success(result.message, {
        position: 'bottom-center',
        autoClose: 3000,
      })
      router.push('/admin/students')
    } catch (error) {
      console.error(error)
      toast.error('Failed to add student.', {
        position: 'bottom-center',
        autoClose: 3000,
      })
    }
  }

  return (
    <div>
      <div className="header mb-4 flex items-center justify-between border-b pb-2">
        <h1 className="text-lg font-medium text-blue-600">Add Student</h1>
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
        <h3 className="mb-4 font-medium text-blue-600">Student Details Form</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="Civil">Civil</option>
                <option value="Mechanical">Mechanical</option>
                <option value="English">English</option>
                <option value="BBA">BBA</option>
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
                <option value="E">D</option>
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
                required
              />
            </div>
            <div className="group relative mx-auto flex w-40 items-center justify-center gap-8">
              {photo && (
                <img
                  src={photo ? URL.createObjectURL(photo) : ''}
                  alt="photo"
                  className="aspect-square border bg-white object-cover p-1"
                />
              )}
              {photo && (
                <div
                  className="absolute -right-2 -top-2 flex aspect-square w-6 cursor-pointer items-center justify-center rounded bg-gray-300 text-sm font-medium text-rose-600 hover:bg-rose-600 hover:text-white"
                  onClick={handleImageRemove}
                >
                  X
                </div>
              )}
            </div>
            <div className="group flex items-center justify-center gap-8">
              <input
                type="submit"
                value="Add Student"
                className="cursor-pointer rounded-lg border bg-blue-500 px-8 py-2 font-medium text-white hover:bg-blue-600"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
