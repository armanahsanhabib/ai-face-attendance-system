import SideNav from '@/app/ui/SideNav'

export const experimental_ppr = true

export const metadata = {
  title: 'Teachers Panel | Facial Recognation Attendence System (FRAS)',
  description:
    'Facial Recognation Attendence System (FRAS), Developed by: Ahsan DevHub',
}

export default function RootLayout({ children }) {
  const links = [
    { name: 'Home', href: '/teacher/dashboard', icon: 'HomeIcon' },
    { name: 'Attendence', href: '/teacher/attendence', icon: 'HomeIcon' },
    { name: 'Students', href: '/teacher/students', icon: 'HomeIcon' },
    {
      name: 'My Courses',
      href: '/teacher/my-courses',
      icon: 'DocumentDuplicateIcon',
    },
  ]

  const colors = {
    text: 'text-rose-600',
    hoverText: 'hover:text-rose-600',
    bg: 'bg-rose-600',
    hoverBg: 'hover:bg-red-100',
    lightBg: 'bg-red-100',
    border: 'border-rose-200',
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <aside className="flex-none">
        <SideNav links={links} text="Teachers Panel" colors={colors} />
      </aside>
      <main className="m-4 flex-grow rounded-md border p-5 md:overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
