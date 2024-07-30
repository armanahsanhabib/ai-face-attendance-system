'use client'

import { fetchAllTeachers } from '@/app/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const page = () => {
  const [teachers, setTeachers] = useState([])
  const [filters, setFilters] = useState({
    dept: '',
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  // Update URL parameters when filters change
  useEffect(() => {
    const { dept } = filters
    const query = new URLSearchParams()
    if (dept) query.append('dept', dept)

    router.push(`/admin/teachers?${query.toString()}`)
  }, [filters, router])

  // Fetch data based on URL parameters
  useEffect(() => {
    const dept = searchParams.get('dept') || ''

    const fetchData = async () => {
      try {
        const response = await fetchAllTeachers(dept)
        setTeachers(response)
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
    <div>
      <div className="header mb-4 flex items-center justify-between border-b pb-2">
        <h1 className="text-lg font-medium text-blue-600">Manage Teachers</h1>
        <div className="buttons">
          <Link
            href="/admin/teachers/add-teacher"
            className="rounded border border-blue-300 bg-sky-200 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            + Add Teacher
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-5 xl:flex-row">
        <div className="border p-2 filter xl:w-64">
          <h2 className="mb-2 border-b pb-2 font-bold">Filter</h2>
          <form
            action=""
            className="flex flex-row flex-wrap justify-between gap-3 text-sm md:text-base xl:flex-col"
          >
            <div className="group flex items-center justify-between gap-2">
              <label htmlFor="dept">Department:</label>
              <select
                name="dept"
                id="dept"
                className="w-32 rounded border px-2 py-1 text-sm outline-none"
                onChange={handleFilterChange}
                value={filters.dept}
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
          </form>
        </div>
        <div className="flex max-h-[calc(100vh-230px)] flex-grow flex-col gap-5 overflow-y-auto xl:max-h-[calc(100vh-125px)]">
          <table className="w-full border text-sm md:text-base">
            <thead className="sticky -top-1 z-10 border bg-gray-100 shadow">
              <tr className="border">
                <th className="border p-2">SL</th>
                <th className="border py-2">Photo</th>
                <th className="border py-2">Name</th>
                <th className="border py-2">Dept.</th>
                <th className="break-all border py-2">Designation</th>
                <th className="border py-2">Tag</th>
                <th className="border py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers?.map((teacher, index) => (
                <tr key={index} className="border text-center">
                  <td className="border p-1">{index + 1}</td>
                  <td className="border p-1">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_URL}/images/teachers/${teacher.photo}`}
                      width={50}
                      height={50}
                      alt={teacher.photo}
                      className="mx-auto h-12 w-12 object-cover"
                    />
                  </td>
                  <td className="border p-1">{teacher.name}</td>
                  <td className="border p-1">{teacher.dept}</td>
                  <td className="border p-1">{teacher.designation}</td>
                  <td className="border p-1">{teacher.tag}</td>
                  <td className="border p-1">
                    <div className="button_group flex flex-wrap items-center justify-center gap-2">
                      <Link
                        href={`/admin/teachers/update-teacher?_id=${teacher._id}`}
                        className="flex w-max rounded border border-orange-300 bg-orange-100 p-1 font-medium text-orange-600 hover:bg-orange-600 hover:text-white"
                      >
                        <FaEdit className="text-lg" />
                      </Link>
                      <Link
                        href={`/admin/teachers/delete-teacher?_id=${teacher._id}`}
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
  )
}

export default page
