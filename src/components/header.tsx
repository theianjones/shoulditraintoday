import DarkModeToggle from './dark-mode-toggle'

function Header() {
  return (
    <div className="relative bg-white-50 dark:bg-gray-800">
      <div className="flex justify-between items-center px-4 py-6 sm:px-6">
        <div className="flex">
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

        <div className="md:flex md:items-end md:justify-between">
          <div className="flex items-center md:ml-12">
            <a
              href="#"
              className="text-base font-medium dark:text-gray-200 text-gray-900 hover:text-gray-900"
            >
              Sign in
            </a>
            <a
              href="#"
              className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-700 hover:bg-red-800"
            >
              Sign up
            </a>
          </div>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Header
