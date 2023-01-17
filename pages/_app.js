import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { useEffect } from 'react';
import { AppContextProvider } from '../contexts/context';
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  

  useEffect(()=> {
    import("bootstrap/dist/js/bootstrap");
  },[])

  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </SessionProvider>
  )
}


