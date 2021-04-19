import React from 'react'
import Head from 'next/head'

import Header from 'components/header'
import Quiz from 'components/quiz'
export default function Home() {
  return (
    <div className="dark:bg-gray-800 bg-gray-50">
      <Head>
        <title>shoulditrain.today</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Quiz></Quiz>
    </div>
  )
}
