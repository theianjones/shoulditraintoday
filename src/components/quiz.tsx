import React, {FormEvent, MouseEventHandler, SyntheticEvent} from 'react'
import {FunctionComponent} from 'react'
import useShouldITrainMachine from 'hooks/use-should-i-train-machine'
import {find} from 'lodash'
import {Question as QuestionType} from 'utils/generate-question-states'

function Quiz() {
  const [current, send] = useShouldITrainMachine()

  if (current.matches('saving')){
    return <div>Saving answers...</div>
  }

  if(current.matches('error')){
    return <div>Oh no, errors...</div>
  }

  if (current.matches('success')) {
    const responses = current.context.responses
    const totalScore = responses.reduce((total: number, currentResponse: {score: number}) => {
      return (total += currentResponse.score)
    }, 0)
    return (
      <div className="text-center">
        You are {totalScore * 4}% ready to train
      </div>
    )
  }

  const currentQuestion = current.context.currentQuestion

  return <Question currentQuestion={currentQuestion} send={send} />
}

const defaultSelectedResponse = -1

function Question({
  currentQuestion,
  send,
}: {
  currentQuestion: QuestionType
  send: any
}) {
  const [selectedResponse, setSelectedResponse] = React.useState(
    defaultSelectedResponse,
  )
  return (
    <div className="grid grid-cols-6 gap-4 mt-8">
      <h1 className="text-4xl leading-10 font-extrabold text-center col-start-2 col-span-4 sm:col-start-3 sm:col-span-2">
        {currentQuestion.value}
      </h1>
      {currentQuestion.byline && (
        <h2 className="text-2xl text-gray-600 col-start-2 col-span-4 sm:col-start-3 sm:col-span-2 text-center">
          ({currentQuestion.byline})
        </h2>
      )}
      <form
        className="col-start-2 col-span-4 sm:col-start-3 sm:col-span-2 mt-4"
        onSubmit={(e) => {
          e.preventDefault()
          const currentResponse = find(currentQuestion.options, {
            score: selectedResponse,
          })
          const eventData = {
            selectedResponse: currentResponse?.value,
            score: currentResponse?.score,
            question: currentQuestion.value,
            questionId: currentQuestion.id,
          }
          setSelectedResponse(defaultSelectedResponse)
          send('CONFIRM', {data: eventData})
        }}
      >
        <legend className="sr-only">Server size</legend>
        <div className="space-y-4">
          {currentQuestion.options.map((option) => (
            <Option
              label={option.value}
              key={option.value}
              onClick={() => {
                setSelectedResponse(option.score)
              }}
            >
              <input
                className="bg-green-600"
                tabIndex={-1}
                type="radio"
                name={option.value}
                value={option.score}
                checked={selectedResponse === option.score}
                readOnly
              />
            </Option>
          ))}
        </div>
        <Button
          className="col-start-2 col-span-4 md:col-start-3 mt-10"
          disabled={selectedResponse === defaultSelectedResponse}
        >
          Next Question
        </Button>
      </form>
    </div>
  )
}

let Option = ({children, label, onClick = () => {}}: any) => {
  const checked = children.props.checked
  const greenBorder = checked
    ? `border-green-500 hover:border-green-600`
    : 'border-gray-30 hover:border-green-600'
  return (
    <label
      className={`relative rounded-lg border-2 0 bg-white shadow-sm px-6 py-4 cursor-pointer  sm:flex sm:justify-between focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-offset-green-400 flex items-center justify-between ${greenBorder}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="text-3xl">
          <p id="server-size-0-label" className="font-light text-gray-900">
            {label}
          </p>
        </div>
      </div>
      {children}
    </label>
  )
}

let Button: FunctionComponent<{
  className?: string
  disabled: boolean
}> = ({children, className, disabled}) => {
  return (
    <button
      type="submit"
      className={`p-6 border border-transparent text-3xl text-center font-medium rounded-md shadow-sm text-white bg-red-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
        className ? className : ''
      } ${
        disabled
          ? 'opacity-70 cursor-not-allowed'
          : 'hover:bg-red-800 cursor-pointer'
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Quiz
