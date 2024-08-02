'use client'

import { fetchAllStudents } from '@/app/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const Page = () => {
  const [students, setStudents] = useState([])
  const [filters, setFilters] = useState({
    dept: '',
    sem: '',
    sec: '',
    id: '',
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  // Update URL parameters when filters change
  useEffect(() => {
    const { dept, sem, sec, id } = filters
    const query = new URLSearchParams()
    if (dept) query.append('dept', dept)
    if (sem) query.append('sem', sem)
    if (sec) query.append('sec', sec)
    if (id) query.append('id', id)

    router.push(`/admin/students?${query.toString()}`)
  }, [filters, router])

  // Fetch data based on URL parameters
  useEffect(() => {
    const dept = searchParams.get('dept') || ''
    const sem = searchParams.get('sem') || ''
    const sec = searchParams.get('sec') || ''
    const id = searchParams.get('id') || ''

    const fetchData = async () => {
      try {
        const response = await fetchAllStudents(dept, sem, sec, id)
        setStudents(response)
      } catch (error) {
        console.error('Error fetching students:', error)
      }
    }

    fetchData()
  }, [searchParams])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }))
  }

  return (
    <Suspense>
      <div>
        <div className="header mb-4 flex items-center justify-between border-b pb-2">
          <h1 className="text-lg font-medium text-blue-600">Manage Students</h1>
          <div className="buttons">
            <Link
              href="/admin/students/add-student"
              className="rounded border border-blue-300 bg-sky-200 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              + Add Student
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
                  value={filters.dept}
                  onChange={handleFilterChange}
                  className="w-32 rounded border px-2 py-1 text-sm outline-none"
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
                  value={filters.sem}
                  onChange={handleFilterChange}
                  className="w-32 rounded border px-2 py-1 text-sm outline-none"
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
                <label htmlFor="sec">Section:</label>
                <select
                  name="sec"
                  id="sec"
                  value={filters.sec}
                  onChange={handleFilterChange}
                  className="w-32 rounded border px-2 py-1 text-sm outline-none"
                >
                  <option value="">All</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
              <div className="group flex items-center justify-between gap-2">
                <label htmlFor="id">ID:</label>
                <input
                  name="id"
                  id="id"
                  value={filters.id}
                  onChange={handleFilterChange}
                  className="w-32 rounded border px-2 py-1 text-sm outline-none"
                  placeholder="Search ID..."
                />
              </div>
            </form>
          </div>
          <div className="flex max-h-[calc(100vh-230px)] flex-grow flex-col gap-5 overflow-y-auto xl:max-h-[calc(100vh-125px)]">
            <table className="w-full border text-sm md:text-base">
              <thead className="sticky -top-1 z-10 border bg-gray-100 shadow">
                <tr className="border">
                  <th className="border py-2">SL</th>
                  <th className="border py-2">Photo</th>
                  <th className="border py-2">ID</th>
                  <th className="border py-2">Name</th>
                  <th className="break-all border py-2">Department</th>
                  <th className="break-all border py-2">Semester</th>
                  <th className="break-all border py-2">Section</th>
                  <th className="break-all border py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {students?.map((student, index) => (
                  <tr key={index} className="border text-center">
                    <td className="border p-1">{index + 1}</td>
                    <td className="border p-1">
                      <Image
                        src={`/images/students/${student.photo}`}
                        width={50}
                        height={50}
                        alt={student.id}
                        className="mx-auto h-12 w-12 object-cover"
                      />
                    </td>
                    <td className="border p-1">{student.id}</td>
                    <td className="border p-1">{student.name}</td>
                    <td className="border p-1">{student.dept}</td>
                    <td className="border p-1">{student.sem}</td>
                    <td className="border p-1">{student.sec}</td>
                    <td className="border p-1">
                      <div className="button_group flex flex-wrap items-center justify-center gap-2">
                        <Link
                          href={`/admin/students/update-student?_id=${student._id}`}
                          className="flex w-max rounded border border-orange-300 bg-orange-100 p-1 font-medium text-orange-600 hover:bg-orange-600 hover:text-white"
                        >
                          <FaEdit className="text-lg" />
                        </Link>
                        <Link
                          href={`/admin/students/delete-student?_id=${student._id}`}
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

export default Page
