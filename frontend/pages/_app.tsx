import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import AuthContextProvider from "../contexts/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )

}

export default MyApp
