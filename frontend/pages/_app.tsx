import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import AuthContextProvider from "../contexts/auth";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AuthContextProvider>
  )

}

export default MyApp
