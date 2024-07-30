import SideNav from '@/app/ui/SideNav'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const experimental_ppr = true

export const metadata = {
  title: 'Admin Panel | Facial Recognation Attendence System (FRAS)',
  description:
    'Facial Recognation Attendence System (FRAS), Developed by: Ahsan DevHub',
}

export default function RootLayout({ children }) {
  const links = [
    { name: 'Home', href: '/admin/dashboard', icon: 'HomeIcon' },
    { name: 'Students', href: '/admin/students', icon: 'HomeIcon' },
    {
      name: 'Teachers',
      href: '/admin/teachers',
      icon: 'DocumentDuplicateIcon',
    },
    { name: 'Courses', href: '/admin/courses', icon: 'UserGroupIcon' },
  ]

  const colors = {
    text: 'text-blue-600',
    hoverText: 'hover:text-blue-600',
    bg: 'bg-blue-600',
    hoverBg: 'hover:bg-sky-100',
    lightBg: 'bg-sky-100',
    border: 'border-blue-200',
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <aside className="flex-none">
        <SideNav links={links} text="Admin Panel" colors={colors} />
      </aside>
      <main className="m-4 flex-grow overflow-y-hidden rounded-md border p-5">
        {children}
      </main>
      <ToastContainer />
    </div>
  )
}
