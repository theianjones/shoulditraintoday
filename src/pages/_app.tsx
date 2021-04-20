import React from 'react'
import {AppProps} from 'next/app'
import '../styles/globals.css'
import {DefaultSeo} from 'next-seo'
import SEO from '../../next-seo.json'
import {ThemeProvider} from 'next-themes'
import initAuth from 'utils/firebase/initAuth'

initAuth()

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
