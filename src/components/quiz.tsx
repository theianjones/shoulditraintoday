import React, {FormEvent, SyntheticEvent} from 'react'
import {FunctionComponent} from 'react'
import {Formik, Field, Form} from 'formik'

let quiz = {
  question: 'How many days in a row have you trained?',
  answers: [
    {
      option: '4+ days',
      value: '1',
    },
    {
      option: '3 days',
      value: '2',
    },
    {
      option: '2 days',
      value: '3',
    },
    {
      option: '1 day',
      value: '4',
    },
    {
      option: 'Coming off a rest day',
      value: '5',
    },
  ],
}

function Quiz({name = 'Quiz'}) {
  return (
    <div className="grid grid-cols-6 gap-4 mt-8">
      <h1 className="text-4xl leading-10 font-extrabold text-center col-start-2 col-span-4 sm:col-start-3 sm:col-span-2 mb-4">
        {quiz.question}
      </h1>
      <Formik
        initialValues={{[name]: ''}}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500))
          alert(JSON.stringify(values, null, 2))
        }}
      >
        {({values}) => (
          <Form className="col-start-2 col-span-4 sm:col-start-3 sm:col-span-2">
            <legend className="sr-only">Server size</legend>
            <div className="space-y-4">
              {quiz.answers.map((option) => (
                <Option label={option.option} key={option.value}>
                  <Field
                    className="bg-green-600"
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={values[name] === option.value}
                  />
                </Option>
              ))}
            </div>
            <Button className="col-start-2 col-span-4 md:col-start-3 mt-10">
              Next Question
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

let Option = ({children, label}: any) => {
  const checked = children.props.checked
  const greenBorder = checked
    ? `border-green-500 hover:border-green-600`
    : 'border-gray-30 hover:border-green-600'
  return (
    <label
      className={`relative rounded-lg border-2 0 bg-white shadow-sm px-6 py-4 cursor-pointer  sm:flex sm:justify-between focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-offset-green-400 flex items-center justify-between ${greenBorder}`}
    >
      {children}
      <div className="flex items-center">
        <div className="text-3xl">
          <p id="server-size-0-label" className="font-light text-gray-900">
            {label}
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

export default Quiz
