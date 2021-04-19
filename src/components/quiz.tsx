import {FunctionComponent} from 'react'

function quiz() {
  let quiz = {
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
    <div className="grid grid-cols-6 gap-4 mt-8">
      <h1 className="text-4xl leading-10 font-extrabold text-center col-start-2 col-span-4 mb-4">
        {quiz.question}
      </h1>
      <fieldset className="col-start-2 col-span-4">
        <legend className="sr-only">Server size</legend>
        <div className="space-y-4">
          {quiz.answers.map((option) => (
            <Option option={option.option} />
          ))}
        </div>
      </fieldset>
      <Button className="col-start-2 col-span-4 mt-10">Next Question</Button>
    </div>
  )
}

let Option = ({option}: any) => {
  return (
    <label className="relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-indigo-500">
      <input
        type="radio"
        name="server_size"
        value="Hobby"
        className="sr-only"
        aria-labelledby="server-size-0-label"
      />
      <div className="flex items-center">
        <div className="text-3xl">
          <p id="server-size-0-label" className="font-light text-gray-900">
            {option}
          </p>
        </div>
      </div>
    </label>
  )
}

let Button: FunctionComponent<{
  className?: string
}> = ({children, className}) => {
  return (
    <button
      type="button"
      className={`p-6 border border-transparent text-3xl text-center font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
        className ? className : ''
      }`}
    >
      {children}
    </button>
  )
}

export default quiz
