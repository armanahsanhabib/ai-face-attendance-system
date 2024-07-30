const page = () => {
  return (
    <div>
      <div className="header mb-4 flex items-center justify-between border-b pb-2">
        <h1 className="text-lg font-medium text-green-600">
          My Courses Attendence
        </h1>
      </div>
      <div className="flex gap-5">
        <div className="w-72 rounded-md border p-2 filter">
          <h2 className="mb-2 border-b pb-2 font-bold">Filter</h2>
          <form action="" className="flex flex-col gap-3">
            <div className="group flex items-center justify-between gap-2">
              <label htmlFor="course">Course:</label>
              <select
                name="course"
                id="course"
                className="w-36 rounded border px-2 py-1 text-sm outline-none"
              >
                <option value="all" selected>
                  All
                </option>
                <option value="cse">CSE</option>
                <option value="eee">EEE</option>
                <option value="civil">Civil</option>
                <option value="mechanical">Mechanical</option>
                <option value="english">English</option>
                <option value="bba">BBA</option>
              </select>
            </div>
            <div className="group flex items-center justify-between gap-2">
              <label htmlFor="from">Date From:</label>
              <input
                type="date"
                name="from"
                id="from"
                className="w-36 rounded border px-2 py-1 text-sm outline-none"
              />
            </div>
            <div className="group flex items-center justify-between gap-2">
              <label htmlFor="to">Date To:</label>
              <input
                type="date"
                name="to"
                id="to"
                className="w-36 rounded border px-2 py-1 text-sm outline-none"
              />
            </div>
          </form>
        </div>
        <div className="attendence flex-grow">
          <table className="w-full border">
            <thead>
              <tr className="border">
                <th className="border py-2">Class</th>
                <th className="border py-2">Date</th>
                <th className="border py-2">Present</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border text-center">
                <td className="border p-1">1</td>
                <td className="border p-1">25-Feb-2024</td>
                <td className="border p-1">✔️</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page
