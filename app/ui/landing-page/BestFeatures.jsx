import {
  FaBell,
  FaChalkboardTeacher,
  FaChartLine,
  FaClock,
  FaCogs,
  FaEnvelopeOpenText,
  FaUserCheck,
  FaUserGraduate,
  FaUserShield,
} from 'react-icons/fa'

const BestFeatures = () => {
  const features = [
    {
      icon: <FaUserShield className="text-blue-500" />,
      title: 'Admin Panel',
      detail:
        'Manage students, teachers, and courses with comprehensive reporting and analytics.',
      bgColor: 'bg-blue-100',
    },
    {
      icon: <FaChalkboardTeacher className="text-red-500" />,
      title: 'Teacher Panel',
      detail:
        'AI-powered attendance with student group photos and tools for attendance correction.',
      bgColor: 'bg-red-100',
    },
    {
      icon: <FaUserGraduate className="text-green-500" />,
      title: 'Student Panel',
      detail:
        'View attendance records and receive notifications for missed classes or discrepancies.',
      bgColor: 'bg-green-100',
    },
    {
      icon: <FaCogs className="text-yellow-500" />,
      title: 'User Management',
      detail:
        'Administrators can add or update user profiles and course schedules easily.',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: <FaChartLine className="text-purple-500" />,
      title: 'Analytics',
      detail:
        'Track attendance trends and identify irregularities with detailed analytics.',
      bgColor: 'bg-purple-100',
    },
    {
      icon: <FaBell className="text-orange-500" />,
      title: 'Notifications',
      detail:
        'Automatic notifications and alert for missed classes to both students and teachers.',
      bgColor: 'bg-orange-100',
    },
    {
      icon: <FaEnvelopeOpenText className="text-teal-500" />,
      title: 'Communication Tools',
      detail:
        'Facilitate communication between teachers and students regarding attendance issues.',
      bgColor: 'bg-teal-100',
    },
    {
      icon: <FaClock className="text-blue-600" />,
      title: 'Efficiency',
      detail:
        'Reduces time required for attendance, allowing educators to focus more on teaching.',
      bgColor: 'bg-blue-100',
    },
    {
      icon: <FaUserCheck className="text-gray-700" />,
      title: 'Accuracy',
      detail:
        'AI-driven facial recognition ensures accurate attendance tracking, minimizing human errors.',
      bgColor: 'bg-gray-100',
    },
  ]

  return (
    <div className="card_container grid grid-cols-3 gap-5">
      {features.map((feature, index) => (
        <div
          key={index}
          className="space-y-3 rounded-lg bg-white p-5 transition-all hover:shadow-lg"
        >
          <div
            className={`icon w-max rounded-md p-4 text-3xl ${feature.bgColor}`}
          >
            {feature.icon}
          </div>
          <div className="text space-y-1">
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-gray-500">{feature.detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BestFeatures
