'use client'

import { fetchCourses } from '@/app/lib/data'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const page = () => {
  const [courses, setCourses] = useState([])
  const [filters, setFilters] = useState({
    dept: '',
    sem: '',
    instructor: '',
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }))
  }

  // Update URL parameters when filters change
  useEffect(() => {
    const { dept, sem, instructor } = filters
    const query = new URLSearchParams()
    if (dept) query.append('dept', dept)
    if (sem) query.append('sem', sem)
    if (instructor) query.append('instructor', instructor)

    router.push(`/admin/courses?${query.toString()}`)
  }, [filters, router])

  useEffect(() => {
    const dept = searchParams.get('dept') || ''
    const sem = searchParams.get('sem') || ''
    const instructor = searchParams.get('instructor') || ''

    const fetchCourse = async () => {
      try {
        const response = await fetchCourses(dept, sem, instructor)
        setCourses(response.data)
      } catch (error) {
        console.error('Error fetching courses:', error)
      }
    }

    fetchCourse()
  }, [searchParams])

  return (
    <Suspense>
      <div>
        <div className="header mb-4 flex items-center justify-between border-b pb-2">
          <h1 className="text-lg font-medium text-blue-600">Manage Courses</h1>
          <div className="buttons">
            <Link
              href={'/admin/courses/add-course'}
              className="rounded border border-blue-300 bg-sky-200 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              + Add Course
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="border p-2 filter xl:w-64">
            <h2 className="mb-2 border-b pb-2 font-bold">Filter</h2>
            <form className="flex flex-row flex-wrap justify-between gap-3 text-sm md:text-base xl:flex-col">
              <div className="group flex items-center justify-between gap-2">
                <label htmlFor="dept">Department:</label>
                <select
                  name="dept"
                  id="dept"
                  className="w-32 rounded border px-2 py-1 text-sm outline-none"
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="CSE">CSE</option>
                  <option value="EEE">EEE</option>
                  <option value="Civil">Civil</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="English">English</option>
                  <option value="BBA">BBA</option>
                </select>
              </div>
              <div className="group flex items-center justify-between gap-2">
                <label htmlFor="sem">Semester:</label>
                <select
                  name="sem"
                  id="sem"
                  className="w-32 rounded border px-2 py-1 text-sm outline-none"
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
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
              <div className="group flex items-center justify-between gap-2">
                <label htmlFor="instructor">Instructor:</label>
                <select
                  name="instructor"
                  id="instructor"
                  className="w-32 rounded border px-2 py-1 text-sm outline-none"
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </div>
            </form>
          </div>
          <div className="flex flex-grow flex-col gap-5">
            {courses?.length === 0 ? (
              <div className="">
                <p>No courses Found!</p>
              </div>
            ) : (
              <table className="w-full border text-sm md:text-base">
                <thead>
                  <tr className="border">
                    <th className="border p-2">SL</th>
                    <th className="border py-2">Dept.</th>
                    <th className="break-all border py-2">Semester</th>
                    <th className="border py-2">Course Code</th>
                    <th className="border py-2">Course Name</th>
                    <th className="border py-2">Instructor</th>
                    <th className="border py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses?.length > 0 &&
                    courses.map((course, index) => (
                      <tr key={course._id} className="border text-center">
                        <td className="border p-1">{index + 1}</td>
                        <td className="border p-1">{course.dept}</td>
                        <td className="border p-1">{course.sem}</td>
                        <td className="border p-1">{course.code}</td>
                        <td className="border p-1">{course.title}</td>
                        <td className="border p-1">{course.instructor}</td>
                        <td className="border p-1">
                          <div className="button_group flex flex-wrap items-center justify-center gap-2">
                            <Link
                              href={`/admin/courses/update-student?_id=${course._id}`}
                              className="flex w-max rounded border border-orange-300 bg-orange-100 p-1 font-medium text-orange-600 hover:bg-orange-600 hover:text-white"
                            >
                              <FaEdit className="text-lg" />
                            </Link>
                            <Link
                              href={`/admin/courses/delete-student?_id=${course._id}`}
                              className="flex w-max rounded border border-rose-300 bg-red-100 p-1 font-medium text-rose-600 hover:bg-rose-600 hover:text-white"
                            >
                              <MdDelete className="text-lg" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            <div className="pagination text-center">
              <button
                type="button"
                className="rounded border bg-gray-300 px-3 py-2"
              >
                Pagination here
              </button>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default page
