import {assign, createMachine} from 'xstate'
import {
  Question,
  getNextQuestion,
  getPrevQuestion,
} from 'utils/generate-question-states'
import quiz from 'data/should-i-train.json'
import {find} from 'lodash'

export interface ShouldITrainQuizMachineContext {
  responses: Score[]
  currentQuestion: Question
}

interface Score {
  score: number
  selectedResponse: string
  question: string
  questionId: string
}

export type ShouldITrainQuizMachineEvent =
  | {
      type: 'BACK'
    }
  | {
      type: 'CONFIRM'
      data: Score
    }

const isScore = (eventData: any): eventData is Score => {
  return (
    (eventData as Score).question !== undefined &&
    (eventData as Score).selectedResponse !== undefined &&
    (eventData as Score).score !== undefined
  )
}

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
            target: 'success',
            actions: ['assignScore', 'assignCurrentQuestion'],
          },
        },
      },
      success: {
        type: 'final',
      },
    },
  },
  {
    services: {},
    actions: {
      assignScore: assign((context, event: any) => {
        const eventData = event.data
        if (!isScore(eventData)) {
          return {}
        }
        const newResponses = context.responses.concat(eventData)
        return {
          responses: newResponses,
        }
      }),
      assignCurrentQuestion: assign((context, event: any) => {
        const eventData = event.data
        if (!isScore(eventData)) return {}
        const nextQuestion = getNextQuestion(eventData.questionId)
        return {currentQuestion: nextQuestion}
      }),
    },
  },
)

export default shouldITrainQuizMachine
