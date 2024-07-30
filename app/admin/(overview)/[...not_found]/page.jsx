import { GoBackButton } from '@/app/ui/buttons'

const NotFound = () => {
  return (
    <div className="h-full w-full">
      <div className="header mb-4 border-b pb-2">
        <h1 className="text-lg font-medium text-blue-600">404 error!</h1>
      </div>
      <div className="flex w-max flex-col gap-3">
        <div className="">
          <h1 className="mb-1 text-3xl font-bold">404 Page Not Found!</h1>
          <p>The page does not exist or is unavailable.</p>
        </div>
        <GoBackButton />
      </div>
    </div>
  )
}

export default NotFound
