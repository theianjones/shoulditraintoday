import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {APP_CREDENTIALS} from './credentials'


const initializeDb = async () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(APP_CREDENTIALS)
  }

  const currentUser = firebase.auth().currentUser
  const db = firebase.firestore()
  const answersCollectionRef = db.collection('answers')
  const responsesCollectionRef = db.collection('responses')
  return {
    db,
    answersCollectionRef,
    responsesCollectionRef,
    currentUser
  }
}

type ID = {
  id: string
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

export const setAnswersForUser = async (answers: Answer[]) => {
  const {db, answersCollectionRef, responsesCollectionRef, currentUser} = await initializeDb()
  const answerBatch = db.batch()
  const createdAt = new Date()
  const userId =  currentUser?.uid
  if(!userId){
    return Promise.reject("Please log in to save responses")
  }

  const totalScore = answers.reduce((score, answer) => score += answer.score, 0) * 4
  return responsesCollectionRef.add({userId, createdAt, totalScore}).then((response) => {
    answers.forEach((answer, index) => {
      const docRef = answersCollectionRef.doc()
      answerBatch.set(docRef, {...answer, userId, createdAt, responseId: response.id, order: index})
    })
    return answerBatch.commit().then(() => response)
  }).catch(e => e)
}
