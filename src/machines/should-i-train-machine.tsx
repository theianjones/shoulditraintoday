import {assign, createMachine} from 'xstate'
import {
  Question,
  getNextQuestion,
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

const enteringFormStates = [
  'enteringTrained',
  'enteringSoreness',
  'enteringExcited',
  'enteringMood',
  'enteringHormones',
  'enteringImmune',
  'enteringHours',
  'enteringQuality',
]


const shouldITrainQuizMachine = createMachine<
  ShouldITrainQuizMachineContext,
  ShouldITrainQuizMachineEvent
>(
  {
    id: 'shouldITrainForm',
    initial: 'enteringTrained',
    context: {responses: [], currentQuestion: quiz.questions[0]},
    states: {
      enteringTrained: {
        on: {
          CONFIRM: {
            target: 'enteringSoreness',
            actions: ['assignScore', 'assignCurrentQuestion'],
          },
        },
      },
      enteringSoreness: {
        on: {
          BACK: {
            target: 'enteringTrained',
          },
          CONFIRM: {
            target: 'enteringExcited',
            actions: ['assignScore', 'assignCurrentQuestion'],
          },
        },
      },
      enteringExcited: {
        on: {
          BACK: {
            target: 'enteringSoreness',
          },
          CONFIRM: {
            target: 'enteringMood',
            actions: ['assignScore', 'assignCurrentQuestion'],
          },
        },
      },
      enteringMood: {
        on: {
          BACK: {
            target: 'enteringExcited',
          },
          CONFIRM: {
            target: 'enteringHormones',
            actions: ['assignScore', 'assignCurrentQuestion'],
          },
        },
      },
      enteringHormones: {
        on: {
          BACK: {
            target: 'enteringMood',
          },
          CONFIRM: {
            target: 'enteringImmune',
            actions: ['assignScore', 'assignCurrentQuestion'],
          },
        },
      },
      enteringImmune: {
        on: {
          BACK: {
            target: 'enteringHormones',
          },
          CONFIRM: {
            target: 'enteringHours',
            actions: ['assignScore', 'assignCurrentQuestion'],
          },
        },
      },
      enteringHours: {
        on: {
          BACK: {
            target: 'enteringImmune',
          },
          CONFIRM: {
            target: 'enteringQuality',
            actions: ['assignScore', 'assignCurrentQuestion'],
          },
        },
      },
      enteringQuality: {
        on: {
          BACK: {
            target: 'enteringHours',
          },
          CONFIRM: {
            target: 'savingAnswers',
            actions: ['assignScore', 'assignCurrentQuestion'],
          },
        },
      },
      savingAnswers: {
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
  },
)

export default shouldITrainQuizMachine
