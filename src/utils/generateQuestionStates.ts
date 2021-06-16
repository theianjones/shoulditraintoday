import quizData from '../../quiz.json'
import capitalize from 'lodash/capitalize'
import findIndex from 'lodash/findIndex'
import toUpper from 'lodash/toUpper'

const getStateName = (questionId: string) => `entering${capitalize(questionId)}`

const getCurrentQuestionIndex = (questionId: string) =>
  findIndex(quizData.questions, {id: questionId})

const getPrevQuestion = (questionId: string) => {
  const currentIndex = getCurrentQuestionIndex(questionId)
  return quizData.questions[currentIndex - 1]
}

const getNextQuestion = (questionId: string) => {
  const currentIndex = getCurrentQuestionIndex(questionId)
  return quizData.questions[currentIndex + 1]
}

interface Question {
  value: string
  id: string
  byline?: string
  options: {
    value: string
    score: number
  }[]
}

const getActionsForQuestion = (questionId: string) => {
  const prevQuestion = getPrevQuestion(questionId)
  const nextQuestion = getNextQuestion(questionId)
  const backAction = !!prevQuestion
    ? {BACK: {target: getStateName(prevQuestion.id)}}
    : {}
  const confirmAction = !!nextQuestion
    ? {
        [`CONFIRM_${toUpper(questionId)}`]: {
          target: getStateName(nextQuestion.id),
          actions: ['assignScore'],
        },
      }
    : {target: 'confirming', actions: ['assignScore']}

  return {on: {...backAction, ...confirmAction}}
}

const getStateForQuestion = (question: Question) => {
  const actions = getActionsForQuestion(question.id)
  const stateName = getStateName(question.id)
  return {[stateName]: {...actions}}
}

const questionStates = quizData.questions.map(getStateForQuestion)

export default questionStates
