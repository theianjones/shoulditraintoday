import {init} from 'next-firebase-auth'
import {APP_CREDENTIALS, ADMIN_CREDENTIALS} from './credentials'
import NEXT_SEO from '../../../next-seo.json'
const initAuth = () => {
  init({
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required
    // firebaseAuthEmulatorHost: 'localhost:9099',
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId: APP_CREDENTIALS.projectId,
        clientEmail: ADMIN_CREDENTIALS.clientEmail,
        // The private key must not be accesssible on the client side.
        privateKey: ADMIN_CREDENTIALS.privateKey,
      },
      databaseURL: APP_CREDENTIALS.databaseUrl,
    },
    firebaseClientInitConfig: {
      apiKey: APP_CREDENTIALS.apiKey, // required
      authDomain: APP_CREDENTIALS.authDomain,
      databaseURL: APP_CREDENTIALS.databaseUrl,
      projectId: APP_CREDENTIALS.projectId,
    },
    cookies: {
      name: NEXT_SEO.title, // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        ADMIN_CREDENTIALS.cookieSecretCurrent,
        ADMIN_CREDENTIALS.cookieSecretPrevious,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  })
}

export default initAuth
