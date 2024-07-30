'use client'

import { useRouter } from 'next/navigation'
import { FaArrowLeftLong } from 'react-icons/fa6'

export const GoBackButton = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }
  return (
    <button
      onClick={handleGoBack}
      className="flex w-max items-center gap-2 rounded-lg bg-blue-500 px-3 py-[5px] text-white hover:bg-blue-600"
    >
      <FaArrowLeftLong /> <span>Go Back</span>
    </button>
  )
}
