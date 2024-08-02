import { IoCheckmarkDone } from 'react-icons/io5'

const AboutPoints = () => {
  const points = [
    'Reduces time spent on attendance, more focus on teaching.',
    'Minimizes human errors with manual attendance tracking.',
    'Students can access their records, promoting transparency.',
    'Provides insights into attendance trends for better engagement.',
  ]

  return (
    <ul className="points_container grid grid-cols-2 gap-x-5 gap-y-3">
      {points.map((text, index) => (
        <li
          key={index}
          className="flex items-center gap-2 text-sm text-gray-600"
        >
          <div className="icon rounded bg-blue-100 p-2 text-blue-600">
            <IoCheckmarkDone className="text-lg" />
          </div>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  )
}

export default AboutPoints
