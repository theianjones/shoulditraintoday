import React from 'react'
import Head from 'next/head'
import DarkModeToggle from '../components/dark-mode-toggle'
import Header from 'components/header'
export default function Home() {
  return (
    <div className="dark:bg-gray-800 bg-gray-50">
      <Head>
        <title>Next.js, TypeScript, Tailwind, Jest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <DarkModeToggle />
    </div>
  )
}
