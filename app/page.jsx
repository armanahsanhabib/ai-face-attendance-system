'use client'

// import Link from 'next/link'

// const Page = () => {

//   return (
//     <div>
//       <div className="container mx-auto">
//         <ul className="flex gap-5 bg-gray-200 px-5 py-3">
//           <li>
//             <Link href="/admin">Admin</Link>
//           </li>
//           <li>
//             <Link href="/teacher">Teachers Panel</Link>
//           </li>
//           <li>
//             <Link href="/student">Students Panel</Link>
//           </li>
//         </ul>
//         <h1 className="text-2xl font-bold text-gray-800">
//           This is the Homepage
//         </h1>
//       </div>
//     </div>
//   )
// }

// export default Page

import * as faceapi from 'face-api.js'
import { useEffect, useRef, useState } from 'react'

function App() {
  const canvasRef = useRef()
  const [image, setImage] = useState(null)
  const [detectedFaces, setDetectedFaces] = useState([])

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
      await faceapi.nets.faceExpressionNet.loadFromUri('/models')
    }
    loadModels()
  }, [])

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    const img = await faceapi.bufferToImage(file)
    setImage(img)
    detectFaces(img)
  }

  const detectFaces = async (img) => {
    const detections = await faceapi
      .detectAllFaces(img, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceExpressions()

    const canvas = faceapi.createCanvasFromMedia(img)
    faceapi.matchDimensions(canvas, { width: img.width, height: img.height })

    const resizedDetections = faceapi.resizeResults(detections, {
      width: img.width,
      height: img.height,
    })

    faceapi.draw.drawDetections(canvas, resizedDetections)
    canvasRef.current.innerHTML = ''
    canvasRef.current.appendChild(canvas)

    extractFaces(img, resizedDetections)
  }

  const extractFaces = async (img, detections) => {
    const faces = await Promise.all(
      detections.map(async (detection) => {
        const { x, y, width, height } = detection.detection.box
        const faceCanvas = document.createElement('canvas')
        faceCanvas.width = width
        faceCanvas.height = height
        faceCanvas
          .getContext('2d')
          .drawImage(img, x, y, width, height, 0, 0, width, height)
        return faceCanvas.toDataURL()
      }),
    )
    setDetectedFaces(faces)
  }

  return (
    <div className="myapp container mx-auto">
      <h1 className="my-4 text-center text-2xl font-bold">
        Face Detection from Image
      </h1>
      <div className="mb-4 flex justify-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="rounded border border-gray-300 p-2"
        />
      </div>
      <div className="image-container relative flex justify-center">
        {image && (
          <img src={image.src} alt="Selected" className="mb-4 h-full w-full" />
        )}
        <canvas
          ref={canvasRef}
          className="absolute left-0 top-0 h-full w-full border border-gray-300"
        />
      </div>
      <div className="detected-faces mt-4 flex flex-wrap justify-center">
        {detectedFaces.map((face, index) => (
          <div key={index} className="m-2">
            <img src={face} alt={`Detected face ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
