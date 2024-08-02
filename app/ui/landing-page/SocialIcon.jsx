import Fb from '@/public/images/common/Buttonfb.png'
import Ig from '@/public/images/common/Buttonig.png'
import Tk from '@/public/images/common/Buttontk.png'
import Yt from '@/public/images/common/Buttonyt.png'
import Image from 'next/image'

const SocialIcon = () => {
  return (
    <div className="icons flex items-center gap-3">
      <a href="https://facebook.com/">
        <Image src={Fb} alt="" className="h-8 w-auto" />
      </a>
      <a href="https://instagram.com/">
        <Image src={Ig} alt="" className="h-8 w-auto" />
      </a>
      <a href="https://youtube.com/">
        <Image src={Yt} alt="" className="h-8 w-auto" />
      </a>
      <a href="https://tiktok.com/">
        <Image src={Tk} alt="" className="h-8 w-auto" />
      </a>
    </div>
  )
}

export default SocialIcon
