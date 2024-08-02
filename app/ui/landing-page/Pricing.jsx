import Link from 'next/link'
import { FaCheckCircle } from 'react-icons/fa'

const pricingPlans = [
  {
    title: 'Half-Yearly',
    price: '$49',
    duration: '/ 6 months',
    description: 'Ideal for short-term use with access to essential features.',
    features: [
      '24/7 Support',
      'Basic Analytics',
      'User Management (up to 50 users)',
      'Regular Updates',
    ],
    iconColor: 'text-blue-600',
  },
  {
    title: 'Yearly',
    price: '$89',
    duration: '/ 12 months',
    description: 'Best value for extended use with advanced features.',
    features: [
      'Premium Support',
      'Advanced Analytics',
      'Unlimited Users',
      'Exclusive Features',
    ],
    iconColor: 'text-blue-600',
  },
]

const PricingPlans = () => {
  return (
    <div className="flex gap-8">
      {pricingPlans.map((plan, index) => (
        <div
          key={index}
          className="card flex w-80 scale-100 flex-col gap-5 rounded-lg bg-white p-6 shadow-md outline-blue-300 transition-all duration-200 hover:scale-105 hover:outline"
        >
          <h3 className="text-sm font-semibold text-gray-800">{plan.title}</h3>
          <h4 className="text-3xl font-bold">
            {plan.price}{' '}
            <span className="text-sm font-medium">{plan.duration}</span>
          </h4>
          <p className="text-sm text-gray-600">{plan.description}</p>
          <ul className="flex flex-col gap-3 text-sm text-gray-600">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <FaCheckCircle className={plan.iconColor} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Link
            href={'/'}
            className="rounded-md bg-blue-600 py-2 text-center text-white first:bg-white hover:bg-blue-700"
          >
            Get started
          </Link>
        </div>
      ))}
    </div>
  )
}

export default PricingPlans
