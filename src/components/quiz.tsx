function quiz() {
  let question = 'How many days in a row have you trained?'
  let questionAnswer = {
    question: 'How many days in a row have you trained?',
    answers: [
      {
        option: '4+ days',
        value: 1,
      },
      {
        option: '3 days',
        value: 2,
      },
      {
        option: '2 days',
        value: 3,
      },
      {
        option: '1 day',
        value: 4,
      },
      {
        option: 'Coming off a rest day',
        value: 5,
      },
    ],
  }

  return (
    <div className="grid grid-cols-6 gap-4">
      <h1 className="text-4xl leading-10 font-extrabold text-center col-start-2 col-span-4">
        {question}
      </h1>
      <fieldset className="col-start-2 col-span-4">
        <legend className="sr-only">Server size</legend>
        <div className="space-y-4">
          <label className="relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <input
              type="radio"
              name="server_size"
              value="Hobby"
              className="sr-only"
              aria-labelledby="server-size-0-label"
              aria-describedby="server-size-0-description-0 server-size-0-description-1"
            />
            <div className="flex items-center">
              <div className="text-3xl">
                <p
                  id="server-size-0-label"
                  className="font-light text-gray-900"
                >
                  4+ days
                </p>
              </div>
            </div>
          </label>

          <label className="relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <input
              type="radio"
              name="server_size"
              value="Startup"
              className="sr-only"
              aria-labelledby="server-size-1-label"
              aria-describedby="server-size-1-description-0 server-size-1-description-1"
            />
            <div className="flex items-center">
              <div className="text-3xl">
                <p
                  id="server-size-0-label"
                  className="font-light text-gray-900"
                >
                  3 days
                </p>
              </div>
            </div>
            <div
              className="border-transparent absolute -inset-px rounded-lg border-2 pointer-events-none"
              aria-hidden="true"
            ></div>
          </label>

          <label className="relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <input
              type="radio"
              name="server_size"
              value="Business"
              className="sr-only"
              aria-labelledby="server-size-2-label"
              aria-describedby="server-size-2-description-0 server-size-2-description-1"
            />
            <div className="flex items-center">
              <div className="text-3xl">
                <p
                  id="server-size-0-label"
                  className="font-light text-gray-900"
                >
                  2 days
                </p>
              </div>
            </div>
            <div
              id="server-size-2-description-1"
              className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
            ></div>
            <div
              className="border-transparent absolute -inset-px rounded-lg border-2 pointer-events-none"
              aria-hidden="true"
            ></div>
          </label>

          <label className="relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <input
              type="radio"
              name="server_size"
              value="Enterprise"
              className="sr-only"
              aria-labelledby="server-size-3-label"
              aria-describedby="server-size-3-description-0 server-size-3-description-1"
            />
            <div className="flex items-center">
              <div className="text-3xl">
                <p
                  id="server-size-0-label"
                  className="font-light text-gray-900"
                >
                  1 days
                </p>
              </div>
            </div>
            <div
              className="border-transparent absolute -inset-px rounded-lg border-2 pointer-events-none"
              aria-hidden="true"
            ></div>
          </label>

          <label className="relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <input
              type="radio"
              name="server_size"
              value="Enterprise"
              className="sr-only"
              aria-labelledby="server-size-3-label"
              aria-describedby="server-size-3-description-0 server-size-3-description-1"
            />
            <div className="flex items-center">
              <div className="text-3xl">
                <p
                  id="server-size-0-label"
                  className="font-light text-gray-900"
                >
                  Coming off a rest day
                </p>
              </div>
            </div>
            <div
              id="server-size-3-description-1"
              className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
            ></div>
          </label>
        </div>
      </fieldset>
    </div>
  )
}

export default quiz
