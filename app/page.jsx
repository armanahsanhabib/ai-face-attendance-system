import AboutImg from '@/public/images/common/about fras.jpg'
import Admin from '@/public/images/common/admin bg.png'
import Image from 'next/image'
import Tablet1 from '../public/images/common/Rectangle 67.png'
import Tablet2 from '../public/images/common/Rectangle 68.png'
import AboutPoints from './ui/landing-page/AboutPoints'
import BestFeatures from './ui/landing-page/BestFeatures'
import DeviceSupports from './ui/landing-page/DeviceSupports'
import Logo from './ui/landing-page/Logo'
import MessageForm from './ui/landing-page/MessageForm'
import Navbar from './ui/landing-page/Navbar'
import PanelCard from './ui/landing-page/PanelCard'
import Pricing from './ui/landing-page/Pricing'
import SocialIcon from './ui/landing-page/SocialIcon'
import YoutubeEmbed from './ui/landing-page/YoutubeEmbed'

function App() {
  return (
    <div
      className="relative flex min-h-screen flex-col text-gray-800"
      id="home"
    >
      {/* Header section */}
      <div className="header sticky left-0 top-0 z-50 border-b bg-white py-3">
        <div className="container mx-auto grid grid-cols-3 items-center justify-center px-5">
          <Logo />
          <Navbar />
          <div className="button space-x-3 text-right">
            <a
              href="#message"
              className="rounded-md border bg-white px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
            >
              Message
            </a>
            <a
              href="https://ahsandevhub.com"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className="hero relative pb-16 text-gray-800">
        <div
          className="bg absolute -z-50 h-full w-full bg-no-repeat"
          style={{
            backgroundImage: `url('${Tablet1.src}'), url('${Tablet2.src}')`,
            backgroundSize: '30%, 30%',
            backgroundPosition:
              'left calc(100% - 100px), calc(100% - 100px) bottom',
          }}
        ></div>
        <div className="container mx-auto max-w-[999px] space-y-8 px-5 py-20">
          <div className="text flex flex-col items-center justify-center gap-3 text-center">
            <p className="rounded-full bg-amber-200 px-5 py-1 text-sm text-amber-600">
              Super feature coming soon.
            </p>
            <h1 className="mt-3 text-5xl font-bold">Ai Powered</h1>
            <h2 className="text-4xl font-bold">
              Face Recognition Attendance System
            </h2>
            <p className="max-w-[600px] text-gray-500">
              No need for traditional methods of attendance tracking like manual
              roll calls or card-based systems, FRAS Ai reduce errors and saves
              time.
            </p>
          </div>
          <div className="image mx-auto aspect-video max-w-[850px] overflow-hidden rounded-lg border-[15px] border-[#8D97F920] transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(150,50,200,0.75)]">
            <YoutubeEmbed />
          </div>
        </div>
      </div>

      {/* Panels Section */}
      <div className="panels">
        <div className="container mx-auto flex flex-col items-center justify-center gap-10 px-5 pb-20 pt-10">
          <div className="text max-w-[600px] space-y-3 text-center">
            <h2 className="text-4xl font-semibold">Made for everyone</h2>
            <p className="leading-tight text-gray-500">
              Provides different interfaces for administrators, teachers, and
              students, each tailored to their specific needs and
              responsibilities.
            </p>
          </div>
          <div className="cards_container grid grid-cols-1 gap-8 lg:grid-cols-3">
            <PanelCard
              title="For Administrators"
              text="Funtionalities for managing students, teachers, and courses."
              image={Admin}
              button="Admin Login"
              link="/admin"
            />
            <PanelCard
              title="For Teachers"
              text="Manage attendance with AI-powered face recongition."
              image={Admin}
              button="Teacher Login"
              link="/teacher"
            />
            <PanelCard
              title="For Students"
              text="Manage your attendance and access course materials."
              image={Admin}
              button="Student Login"
              link="/student"
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about" id="about">
        <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-5 py-20 lg:grid-cols-2">
          <div className="left space-y-6">
            <h2 className="max-w-[600px] text-4xl font-semibold">
              Why Ai face recognition attendance system?
            </h2>
            <p className="max-w-[600px] text-sm text-gray-500">
              AI Face Recognition Attendance System (FRAS) uses AI to transform
              attendance management in educational institutions. It offers
              efficient, accurate, and user-friendly interfaces for all
              stakeholders, streamlining administrative tasks, fostering
              transparency, and enhancing operational efficiency.
            </p>
            <AboutPoints />
          </div>
          <div className="right h-[400px] overflow-hidden rounded-lg bg-blue-200 p-5">
            <Image
              src={AboutImg}
              alt="About fras image"
              className="h-full w-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features mt-10 bg-gray-100" id="features">
        <div className="container mx-auto flex flex-col items-center justify-center gap-10 px-5 py-20">
          <div className="text max-w-[600px] space-y-3 text-center">
            <h2 className="text-4xl font-semibold">Best features</h2>
            <p className="text-gray-500">
              Discover the key functionalities that make our
              AI-Face-Attendance-System stand out.
            </p>
          </div>
          <BestFeatures />
        </div>
      </div>

      {/* Device Support Section */}
      <div className="device">
        <div className="container mx-auto flex flex-col items-center justify-center gap-10 px-5 py-20">
          <div className="text max-w-[600px] space-y-3 text-center">
            <h2 className="text-4xl font-semibold">Supports any platform</h2>
            <p className="text-gray-500">
              Compatible with all devices and platforms, offering seamless
              access on desktops, tablets, and smartphones.
            </p>
          </div>
          <DeviceSupports />
        </div>
      </div>

      {/* Pricing Section */}
      <div className="pricing bg-gray-100" id="pricing">
        <div className="container mx-auto flex flex-col items-center justify-center gap-10 px-5 py-20">
          <div className="text max-w-[600px] space-y-3 text-center">
            <h2 className="text-4xl font-semibold">Pricing Plans</h2>
            <p className="text-gray-500">
              Choose a plan that fits your needs and budget.
            </p>
          </div>
          <Pricing />
        </div>
      </div>

      {/* Contact Section */}
      <div className="message bg-white" id="message">
        <div className="container mx-auto flex flex-col items-center justify-center gap-10 px-5 py-20">
          <div className="text max-w-[600px] space-y-3 text-center">
            <h2 className="text-4xl font-semibold">Message me</h2>
            <p className="text-gray-500">
              Have a question or want to get in touch? Fill out the form below
              to send me a message.
            </p>
          </div>
          <MessageForm />
        </div>
      </div>

      {/* Footer section */}
      <div className="footer border-t bg-white py-10">
        <div className="container mx-auto flex justify-between px-5">
          <div className="left space-y-3">
            <Logo />
            <p className="text-start text-sm">
              <a
                href="https://ahsandevhub.com/projects/fras-ai"
                className="hover:text-blue-600 hover:underline"
              >
                FRAS Ai
              </a>{' '}
              Copyright @ {new Date().getFullYear().toString()} - All rights
              reserved.
            </p>
            <SocialIcon />
          </div>
          <p className="text-center">
            Made with ❤️{' '}
            <a
              href="https://ahsandevhub.com"
              className="hover:text-blue-600 hover:underline"
            >
              Ahsan DevHub
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
