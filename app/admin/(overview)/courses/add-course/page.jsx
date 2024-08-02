'use client'

import { addCourse } from '@/app/lib/actions'
import { fetchAllTeacherName } from '@/app/lib/data'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const router = useRouter()
  const [teacherNames, setTeacherNames] = useState([])
  const [formData, setFormData] = useState({
    dept: '',
    sem: '',
    title: '',
    code: '',
    credit: '',
    instructor: '',
  })
  const [queryDept, setQueryDept] = useState('')

  useEffect(() => {
    const fetchTeacherNames = async () => {
      try {
        const response = await fetchAllTeacherName(queryDept)
        setTeacherNames(response)
        console.log(response)
      } catch (error) {
        console.error('Error fetching teacher names:', error)
        setTeacherNames([])
      }
    }

    fetchTeacherNames()
  }, [queryDept])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await addCourse(formData)

      console.log(result.message)
      toast.success(result.message, {
        position: 'bottom-center',
        autoClose: 3000,
      })
      router.push('/admin/courses')
    } catch (error) {
      console.error(error)
      toast.error('Failed to add course.', {
        position: 'bottom-center',
        autoClose: 3000,
      })
    }
  }

  return (
    <div>
      <div className="header mb-4 flex items-center justify-between border-b pb-2">
        <h1 className="text-lg font-medium text-blue-600">Add Course</h1>
        <div className="buttons">
          <Link
            href="/admin/courses"
            className="rounded border border-blue-300 bg-sky-200 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            {'< Go Back'}
          </Link>
        </div>
      </div>
      <div className="container mx-auto max-w-3xl rounded-lg border bg-gray-50 p-5">
        <h3 className="mb-4 font-medium text-blue-600">Course Details Form</h3>
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
          </div>
          <div className="input_items flex flex-col gap-5">
            <div className="group flex items-center gap-8">
              <label htmlFor="title" className="w-32">
                Course Title:
              </label>
              <input
                name="title"
                id="title"
                type="text"
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter course name..."
                required
              />
            </div>
            <div className="group flex items-center gap-8">
              <label htmlFor="name" className="w-32">
                Course Code:
              </label>
              <input
                name="code"
                id="code"
                type="text"
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="Enter code..."
                required
              />
            </div>
            <div className="group flex items-center gap-8">
              <label htmlFor="credit" className="w-32">
                Credit:
              </label>
              <input
                name="credit"
                id="credit"
                type="text"
                className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                value={formData.credit}
                onChange={handleInputChange}
                placeholder="Enter credit..."
                required
              />
            </div>
            <div className="group flex items-center gap-8">
              <label htmlFor="instructor" className="w-32">
                Instructor:
              </label>
              <div className="flex flex-grow gap-5">
                <select
                  name="queryDept"
                  id="queryDept"
                  className="w-36 flex-none rounded border px-3 py-2 text-sm outline-none"
                  value={queryDept}
                  onChange={(e) => setQueryDept(e.target.value)}
                >
                  <option value="" disabled>
                    Dept
                  </option>
                  <option value="CSE">CSE</option>
                  <option value="EEE">EEE</option>
                  <option value="Civil">Civil</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="English">English</option>
                  <option value="BBA">BBA</option>
                </select>
                <select
                  name="instructor"
                  id="instructor"
                  className="flex-grow rounded border px-3 py-2 text-sm outline-none"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {teacherNames.length > 0 &&
                    teacherNames.map((teacher, index) => (
                      <option key={teacher?._id} value={teacher?._id}>
                        {`${teacher?.name} (${teacher?.tag})`}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="group flex items-center justify-center gap-8">
              <input
                type="submit"
                value="Add Course"
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
