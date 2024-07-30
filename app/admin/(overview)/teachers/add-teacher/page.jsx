'use client'

import { addTeacher, removeTeacher } from '@/app/lib/actions'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import path from 'path'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    dept: '',
    name: '',
    phone: '',
    email: '',
    designation: '',
    tag: '',
  })
  const [teacherPhoto, setTeacherPhoto] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setTeacherPhoto(file)
  }

  const handleImageRemove = () => {
    const fileInput = document.getElementById('photo')
    fileInput.value = null

    setTeacherPhoto(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const extName = path.extname(teacherPhoto.name).toLowerCase()
      formData.photo = `${formData.tag.toLowerCase()}${['.jpeg', '.jpg', '.png'].includes(extName) ? '.jpg' : extName}`
      const result = await addTeacher(formData)

      if (result.status !== 200) {
        throw new Error(result.error)
      }

      const photoFormData = new FormData()
      photoFormData.append('photo', teacherPhoto)
      photoFormData.append('tag', formData.tag)

      try {
        await axios.post('/api/upload-teacher-photo', photoFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      } catch (error) {
        await removeTeacher(result.id)
        throw new Error('Failed to upload photo')
      }

      console.log(result.message)
      toast.success(result.message, {
        position: 'bottom-center',
        autoClose: 3000,
      })
      router.push('/admin/teachers')
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
        <h1 className="text-lg font-medium text-blue-600">Add Teacher</h1>
        <div className="buttons">
          <Link
            href="/admin/teachers"
            className="rounded border border-blue-300 bg-sky-200 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            {'< Go Back'}
          </Link>
        </div>
      </div>
      <div className="container mx-auto max-w-3xl rounded-lg border bg-gray-50 p-5">
        <h3 className="mb-4 font-medium text-blue-600">Teacher Details Form</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="input_items flex flex-col gap-5">
            <div className="group flex items-center gap-8">
              <label htmlFor="dept" className="w-32">
                Department:
              </label>
              <select
                name="dept"
                id="dept"
                onChange={handleInputChange}
                value={formData.dept}
                className="flex-grow rounded border px-2 py-2 text-sm outline-none"
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
            <div className="group flex items-center gap-8">
              <label htmlFor="name" className="w-32">
                Teacher Name:
              </label>
              <input
                name="name"
                id="name"
                type="text"
                onChange={handleInputChange}
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={formData.name}
                placeholder="Enter name..."
                required
              />
            </div>
            <div className="group flex items-center gap-8">
              <label htmlFor="tag" className="w-32">
                Teacher's Tag:
              </label>
              <input
                name="tag"
                id="tag"
                type="text"
                onChange={handleInputChange}
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={formData.tag}
                placeholder="Enter teacher's tag..."
                required
              />
            </div>
            <div className="group flex items-center gap-8">
              <label htmlFor="designation" className="w-32">
                Designation:
              </label>
              <input
                name="designation"
                id="designation"
                type="text"
                onChange={handleInputChange}
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={formData.designation}
                placeholder="Enter designation..."
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
                onChange={handleInputChange}
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={formData.phone}
                placeholder="Enter phone..."
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
                onChange={handleInputChange}
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={formData.email}
                placeholder="Enter email..."
              />
            </div>
            <div className="group flex items-center gap-8">
              <label htmlFor="photo" className="w-32">
                Teacher Photo:
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
              {teacherPhoto && (
                <img
                  src={teacherPhoto ? URL.createObjectURL(teacherPhoto) : ''}
                  alt="photo"
                  className="aspect-square border bg-white object-cover p-1"
                />
              )}
              {teacherPhoto && (
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
                value="Add Teacher"
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
