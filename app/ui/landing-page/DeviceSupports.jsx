import Android from '@/public/images/common/iconandroid.png'
import Chrome from '@/public/images/common/iconchrome.png'
import Win from '@/public/images/common/iconwin.png'
import Ios from '@/public/images/common/ios.png'
import Image from 'next/image'

const DeviceSupports = () => {
  return (
    <div className="card_container flex items-center justify-center gap-5">
      <div className="card group flex aspect-square h-48 flex-col items-center justify-center gap-2 rounded-lg bg-gray-100">
        <Image
          src={Chrome}
          alt="chrome"
          className="sclae-100 transition-all duration-200 group-hover:scale-105"
        />
        <p className="text-sm text-gray-600">Browser / web</p>
      </div>
      <div className="card group flex aspect-square h-48 flex-col items-center justify-center gap-2 rounded-lg bg-gray-100">
        <Image
          src={Ios}
          alt="chrome"
          className="transition-all duration-200 group-hover:scale-105"
        />
        <p className="text-sm text-gray-600">iOS / Mac</p>
      </div>
      <div className="card group flex aspect-square h-48 flex-col items-center justify-center gap-2 rounded-lg bg-gray-100">
        <Image
          src={Android}
          alt="chrome"
          className="sclae-100 transition-all duration-200 group-hover:scale-105"
        />
        <p className="text-sm text-gray-600">Android</p>
      </div>
      <div className="card group flex aspect-square h-48 flex-col items-center justify-center gap-2 rounded-lg bg-gray-100">
        <Image
          src={Win}
          alt="chrome"
          className="sclae-100 transition-all duration-200 group-hover:scale-105"
        />
        <p className="text-sm text-gray-600">Windows</p>
      </div>
    </div>
  )
}

export default DeviceSupports
