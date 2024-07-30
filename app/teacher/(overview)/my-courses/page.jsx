const page = () => {
  return (
    <div>
      <div className="header mb-4 flex items-center justify-between border-b pb-2">
        <h1 className="text-lg font-medium text-rose-600">My Courses</h1>
      </div>
      <div className="flex gap-5">
        <div className="w-64 border p-2 filter">
          <h2 className="mb-2 border-b pb-2 font-bold">Filter</h2>
          <form action="" className="flex flex-col gap-3">
            <div className="group flex items-center justify-between gap-2">
              <label htmlFor="dept">Department:</label>
              <select
                name="dept"
                id="dept"
                className="w-32 rounded border px-2 py-1 text-sm outline-none"
              >
                <option value="all">All</option>
                <option value="cse">CSE</option>
                <option value="eee">EEE</option>
                <option value="civil">Civil</option>
                <option value="mechanical">Mechanical</option>
                <option value="english">English</option>
                <option value="bba">BBA</option>
              </select>
            </div>
            <div className="group flex items-center justify-between gap-2">
              <label htmlFor="sem">Semester:</label>
              <select
                name="sem"
                id="sem"
                className="w-32 rounded border px-2 py-1 text-sm outline-none"
              >
                <option value="all">All</option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
              </select>
            </div>
            <div className="group flex items-center justify-between gap-2">
              <label htmlFor="sec">Section:</label>
              <select
                name="sec"
                id="sec"
                className="w-32 rounded border px-2 py-1 text-sm outline-none"
              >
                <option value="all">All</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="group flex items-center justify-between gap-2">
              <label htmlFor="id">ID:</label>
              <input
                name="id"
                id="id"
                className="w-32 rounded border px-2 py-1 text-sm outline-none"
                placeholder="Search ID..."
              />
            </div>
          </form>
        </div>
        <div className="flex flex-grow flex-col gap-5">
          <table className="w-full border">
            <thead>
              <tr className="border">
                <th className="border py-2">SL</th>
                <th className="w-20 border py-2">Photo</th>
                <th className="border py-2">ID</th>
                <th className="border py-2">Name</th>
                <th className="border py-2">Department</th>
                <th className="border py-2">Semester</th>
                <th className="border py-2">Section</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border text-center">
                <td className="border p-1">1</td>
                <td className="border p-1">
                  {/* <Image
                    src={Img}
                    alt="12311001"
                    className="mx-auto h-12 w-auto"
                  /> */}
                </td>
                <td className="border p-1">12311001</td>
                <td className="border p-1">Amy Enderson</td>
                <td className="border p-1">CSE</td>
                <td className="border p-1">4th</td>
                <td className="border p-1">A</td>
              </tr>
            </tbody>
          </table>
          <div className="pagination text-center">
            <button
              type="button"
              className="rounded border bg-gray-300 px-3 py-2"
            >
              Pagination here
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
