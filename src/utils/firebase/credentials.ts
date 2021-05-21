export const APP_CREDENTIALS = {
  apiKey: 'AIzaSyAWgOxkLC8GiPgK0Xgs_3B3LTR6MSURvrM',
  authDomain: 'should-i-train-today.firebaseapp.com',
  projectId: 'should-i-train-today',
  storageBucket: 'should-i-train-today.appspot.com',
  messagingSenderId: '756906872740',
  appId: '1:756906872740:web:81c77f3a37e23d97fdbb31',
  measurementId: 'G-QV0WMKXWSZ',
  databaseUrl: 'https://should-i-train-today.firebaseio.com',
}

const privateKey = process.env.FIREBASE_PRIVATE_KEY as string
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL as string
const cookieSecretPrevious = process.env.COOKIE_SECRET_PREVIOUS as string
const cookieSecretCurrent = process.env.COOKIE_SECRET_CURRENT as string

export const ADMIN_CREDENTIALS = {
  privateKey,
  clientEmail,
  cookieSecretPrevious,
  cookieSecretCurrent,
}
