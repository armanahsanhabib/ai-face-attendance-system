import LogoImg from '@/public/images/common/face_id_logo.png'
import Image from 'next/image'

const Logo = () => {
  return (
    <div className="logo flex items-center gap-2">
      <Image src={LogoImg} alt="Logo" className="h-8 w-auto" />
      <div className="flex flex-col">
        <div className="bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 bg-clip-text text-xl font-bold leading-none text-transparent">
          FRAS Ai
        </div>
        <p className="text-xs leading-none">Ai Attendance System</p>
      </div>
    </div>
  )
}

export default Logo
