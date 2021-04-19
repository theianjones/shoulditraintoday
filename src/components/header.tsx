function Header() {
  return (
    <div className="relative bg-white-50 dark:bg-gray-800">
      <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10 w-full">
        <div>
          <a
            href="#"
            className="flex items-center font-bold dark:text-gray-50 text-gray-800"
          >
            <span className="sr-only">Workflow</span>
            <img
              className="h-4 w-auto mr-2"
              src="https://res.cloudinary.com/dpspogkzf/image/upload/v1618869726/shoulditrain/logo_wl1ezx.svg"
              alt=""
            />
            shoulditrain.today
          </a>
        </div>

        <div className="hidden md:flex md:items-center md:justify-between">
          <div className="flex items-center md:ml-12">
            <a
              href="#"
              className="text-base font-medium dark:text-gray-200 text-gray-900 hover:text-gray-900"
            >
              Sign in
            </a>
            <a
              href="#"
              className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
