import DarkModeToggle from './dark-mode-toggle'
import React from 'react'
function Header({
  email,
  signOut = () => {},
}: {
  email?: string | null
  signOut?: () => void
}) {
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

        <div className="flex md:items-end md:justify-between">
          {email ? (
            <div className="flex items-center">
              <p className="pr-2">{email}</p>
              <button
                className="text-base font-medium dark:text-gray-200 text-gray-900 hover:text-gray-900"
                type="button"
                onClick={() => {
                  signOut()
                }}
              >
                Sign out
              </button>
              <DarkModeToggle />
            </div>
          ) : (
            <div className="flex items-center md:ml-12">
              <a
                href="/login"
                className="text-base font-medium dark:text-gray-200 text-gray-900 hover:text-gray-900"
              >
                Sign in
              </a>
              <DarkModeToggle />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
