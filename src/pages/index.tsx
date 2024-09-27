import React from 'react'
import Head from 'next/head'
import Header from 'components/header'
import Quiz from 'components/quiz'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
function Home() {
  const AuthUser = useAuthUser()
  return (
    <div className="dark:bg-gray-800 bg-gray-50">
      <Head>
        <title>shoulditrain.today</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      {AuthUser.email
        ? <Quiz/>
        : <div>Please login to take quiz</div>
        }
    </div>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Home)
