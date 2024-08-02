'use client'

import { fetchAllStudents, fetchStudentIds } from '@/app/lib/data'
import * as faceapi from 'face-api.js'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef, useState } from 'react'
import { TiDelete } from 'react-icons/ti'

const Page = () => {
  const canvasRef = useRef()
  const [image, setImage] = useState(null)
  const [detectedFaces, setDetectedFaces] = useState([])
  const [confidence, setConfidence] = useState(0.5)
  const [isModelLoading, setIsModelLoading] = useState(true)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [isAllImageLoaded, setAllImageLoaded] = useState(false)

  const [students, setStudents] = useState([])
  const [filters, setFilters] = useState({
    dept: '',
    sem: '',
    sec: '',
    course: '',
  })
  const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState([])
  const router = useRouter()
  const searchParams = useSearchParams()

  // Update URL parameters when filters change
  useEffect(() => {
    const { dept, sem, sec, course } = filters
    const query = new URLSearchParams()
    if (dept) query.append('dept', dept)
    if (sem) query.append('sem', sem)
    if (sec) query.append('sec', sec)
    if (course) query.append('course', course)

    router.push(`/teacher/attendence/?${query.toString()}`)
  }, [filters, router])

  // Fetch data based on URL parameters
  useEffect(() => {
    const dept = searchParams.get('dept') || ''
    const sem = searchParams.get('sem') || ''
    const sec = searchParams.get('sec') || ''

    const fetchData = async () => {
      if (filters.dept && filters.sem && filters.sec) {
        try {
          const response = await fetchAllStudents(dept, sem, sec)
          console.log(response)
          setStudents(response)
        } catch (error) {
          console.error('Error fetching students:', error)
        }
      }
    }

    fetchData()
  }, [searchParams])

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      setIsModelLoading(true)
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
      setIsModelLoading(false)
    }
    loadModels()
  }, [])

  // Load labeled images based on filters
  useEffect(() => {
    const loadLabeledImages = async () => {
      if (isModelLoading || !filters.dept || !filters.sem || !filters.sec)
        return
      setIsImageLoading(true)
      const labels = await fetchStudentIds(
        filters.dept,
        filters.sem,
        filters.sec,
      )
      console.log(labels)
      const descriptors = []

      for (const label of labels) {
        const img = await faceapi.fetchImage(`/images/students/${label}.jpg`)
        const detection = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor()
        if (detection) {
          descriptors.push(
            new faceapi.LabeledFaceDescriptors(label, [detection.descriptor]),
          )
        }
      }
      setLabeledFaceDescriptors(descriptors)
      setIsImageLoading(false)
      setAllImageLoaded(true)
    }
    loadLabeledImages()
  }, [filters.dept, filters.sem, filters.sec, isModelLoading])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }))
  }

  const handleAttendance = (id) => {
    console.log('CLiked: ' + id)
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    const img = await faceapi.bufferToImage(file)
    setConfidence(0.5)
    setImage(img)
    detectFaces(img)
  }

  const handleImageRemove = () => {
    const fileInput = document.getElementById('image')
    fileInput.value = null
    setConfidence(0.5)
    setImage(null)
    setDetectedFaces([])
  }

  const handleConfidenceChange = async (e) => {
    setConfidence(parseFloat(e.target.value))
  }

  useEffect(() => {
    if (image) {
      const file = document.getElementById('image').files[0]
      ;(async () => {
        const img = await faceapi.bufferToImage(file)
        detectFaces(img)
      })()
    }
  }, [confidence, searchParams])

  const detectFaces = async (img) => {
    if (isImageLoading || labeledFaceDescriptors.length === 0) return

    const detections = await faceapi
      .detectAllFaces(
        img,
        new faceapi.SsdMobilenetv1Options({ minConfidence: confidence }),
      )
      .withFaceLandmarks()
      .withFaceDescriptors()

    const imgElement = document.getElementById('renderedImage')
    const displaySize = {
      width: imgElement.offsetWidth,
      height: imgElement.offsetHeight,
    }

    canvasRef.current.innerHTML = ''
    canvasRef.current.width = displaySize.width
    canvasRef.current.height = displaySize.height

    faceapi.matchDimensions(canvasRef.current, displaySize)

    const resizedDetections = faceapi.resizeResults(detections, displaySize)

    faceapi.draw.drawDetections(canvasRef.current, resizedDetections)

    extractAndMatchFaces(img, detections)
  }

  const extractAndMatchFaces = async (img, detections) => {
    if (labeledFaceDescriptors.length === 0) return

    // Create FaceMatcher instance
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors)

    const faces = await Promise.all(
      detections.map(async (detection) => {
        const { x, y, width, height } = detection.detection.box
        const faceCanvas = document.createElement('canvas')
        faceCanvas.width = width
        faceCanvas.height = height
        faceCanvas
          .getContext('2d')
          .drawImage(img, x, y, width, height, 0, 0, width, height)
        const faceDescriptor = detection.descriptor

        // Match face descriptor with labeled faces
        const bestMatch = faceMatcher.findBestMatch(faceDescriptor)
        return { face: faceCanvas.toDataURL(), label: bestMatch.toString() }
      }),
    )
    setDetectedFaces(faces)
  }

  const detectedIdArray = detectedFaces.map((face) => face.label.split(' ')[0])

  return (
    <Suspense>
      <div>
        <div className="header mb-3 flex items-center justify-between border-b pb-2">
          <h1 className="text-lg font-medium text-rose-600">Attendance Page</h1>
        </div>
        {isModelLoading ? (
          <div className="">Loading Models, Please wait...</div>
        ) : (
          <div className="flex max-h-full flex-col gap-3">
            <div className="filter_container rounded-md border bg-gray-100 px-2 py-2">
              <form action="" className="flex gap-5">
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
                  <label htmlFor="course">Course:</label>
                  <select
                    name="course"
                    id="course"
                    value={filters.course}
                    onChange={handleFilterChange}
                    className="w-32 rounded border px-2 py-1 text-sm outline-none"
                  >
                    <option value="">All</option>
                    {students.map((student) => (
                      <option key={student._id} value={student._id}>
                        {student.course}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            {!isModelLoading && isAllImageLoaded && (
              <div className="grid flex-grow grid-cols-1 gap-5 xl:grid-cols-2">
                <div className="left flex max-h-[calc(100vh-230px)] flex-col gap-3 overflow-y-auto xl:max-h-[calc(100vh-180px)]">
                  <div className="relative max-w-full flex-none overflow-hidden rounded-md border bg-sky-100">
                    <label htmlFor="image" className="cursor-pointer">
                      {image ? (
                        <div className="relative aspect-video">
                          <img
                            id="renderedImage"
                            src={image.src}
                            alt="image"
                            className="object-cover"
                          />
                          <canvas
                            ref={canvasRef}
                            className="absolute left-0 top-0 h-full w-full"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-video items-center justify-center">
                          <span className="h-max rounded border-2 border-dotted border-blue-500 px-8 py-4 text-lg font-medium text-blue-600">
                            + Click to add Image
                          </span>
                        </div>
                      )}
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                      className="hidden"
                    />
                    {image && (
                      <div
                        className="absolute right-0 top-0 m-1 cursor-pointer rounded p-2 text-sm text-white hover:bg-rose-600"
                        onClick={() => handleImageRemove()}
                      >
                        <TiDelete className="text-3xl" />
                      </div>
                    )}
                  </div>
                  {image && (
                    <div className="photo_bottom flex items-center justify-between rounded-md border p-2">
                      <div className="text font-medium">
                        {detectedFaces.length} faces detected!
                      </div>
                      <div className="confidence_group flex items-center gap-2">
                        <label htmlFor="confidence">Min Confidence:</label>
                        <input
                          type="number"
                          id="confidence"
                          max={0.9}
                          min={0.1}
                          step={0.1}
                          value={confidence}
                          onChange={handleConfidenceChange}
                          className="rounded border text-center outline-none"
                        />
                      </div>
                    </div>
                  )}
                  {image && (
                    <div className="faces rounded-md border p-2">
                      <div className="content mx-auto flex flex-wrap gap-3">
                        {detectedFaces.map((faceData, index) => (
                          <div
                            key={index}
                            className="face_box flex flex-col items-center border border-blue-600"
                          >
                            <div className="w-full">
                              <img
                                src={faceData.face}
                                alt={`Detected face ${index + 1}`}
                                className="h-16 w-16 bg-gray-300 object-cover"
                              />
                            </div>
                            <div className="py-1 text-center text-xs font-medium">
                              {faceData.label.split(' ')[0]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {isAllImageLoaded &&
                  filters.dept &&
                  filters.sem &&
                  filters.sec && (
                    <div className="flex max-h-[calc(100vh-230px)] flex-none flex-col gap-5 overflow-y-auto xl:max-h-[calc(100vh-180px)]">
                      <table className="w-full border text-sm md:text-base">
                        <thead className="sticky -top-1 z-10 border bg-gray-100 shadow">
                          <tr className="border">
                            <th className="border py-2">SL</th>
                            <th className="border py-2">Photo</th>
                            <th className="border py-2">ID</th>
                            <th className="border py-2">Name</th>
                            <th className="break-all border py-2">
                              Attendence
                            </th>
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
                              <td className="border p-1">
                                <div className="button_group flex flex-wrap items-center justify-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={detectedIdArray.includes(
                                      student.id,
                                    )}
                                    onChange={() =>
                                      handleAttendance(student._id)
                                    }
                                    className="form-checkbox h-5 w-5 cursor-pointer rounded border-gray-300 text-emerald-600 focus:ring-0"
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
              </div>
            )}
          </div>
        )}
      </div>
    </Suspense>
  )
}

export default Page
