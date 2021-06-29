import {assign, createMachine} from 'xstate'
import questionStates, {
  Question,
  getNextQuestion
} from 'utils/generate-question-states'
import quiz from 'data/should-i-train.json'
import { setAnswersForUser } from 'utils/firebase/db'

export interface ShouldITrainQuizMachineContext {
  responses: Answer[]
  currentQuestion: Question
}

type Answer = {
  quizVersion: number
  quizId: string
  totalScore: number
  question: string
  questionId: string
  selectedResponse: string
  score: number
}

export type ShouldITrainQuizMachineEvent =
  | {
      type: 'BACK'
      data: unknown
    }
  | {
      type: 'CONFIRM'
      data: Answer
    }

const isAnswer = (eventData: any): eventData is Answer => {
  return (
    (eventData as Answer).question !== undefined &&
    (eventData as Answer).selectedResponse !== undefined &&
    (eventData as Answer).score !== undefined
  )
}

const shouldITrainQuizMachine = createMachine<
  ShouldITrainQuizMachineContext,
  ShouldITrainQuizMachineEvent
>(
  {
    id: 'shouldITrainForm',
    initial: 'entering',
    context: {responses: [], currentQuestion: quiz.questions[0]},
    states: {
      entering: {
        on: {
          CONFIRM: [
            {
              target: 'saving',
              cond: 'nextQuestionIsEmpty',
              actions: ['assignScore']
            },
            {
              target: 'entering',
              actions: ['assignScore', 'assignCurrentQuestion'],
            }
          ]
        }
      },
      saving: {
        invoke: {
          id: 'savingAnswers',
          src: 'saveAllAnswers',
          onError: {target: 'error'},
          onDone: {
            target: 'success'
          }
        }
      },
      error: {
        type: 'final'
      },
      success: {
        type: 'final',
      },
    },
  },
  {
    services: {
      saveAllAnswers: (context) => setAnswersForUser(context.responses)
    },
    actions: {
      assignScore: assign((context, event: any) => {
        const eventData = event.data
        if (!isAnswer(eventData)) {
          return {}
        }
        const newResponses = context.responses.concat(eventData)
        return {
          responses: newResponses,
        }
      }),
      assignCurrentQuestion: assign((context, event: any) => {
        const eventData = event.data
        if (!isAnswer(eventData)) return {}
        const nextQuestion = getNextQuestion(eventData.questionId)
        return {currentQuestion: nextQuestion}
      }),
    },
    guards: {
      nextQuestionIsEmpty: (_context, event) => {
        const eventData = event.data
        if (!isAnswer(eventData)) return false
        const nextQuestion = getNextQuestion(eventData.questionId)
        return !nextQuestion
      }
    }
  },
)

export default shouldITrainQuizMachine
