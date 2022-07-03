import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import {defaultOptions} from "../lib/axiosConfig";
import {BASE_BACKEND_URL} from "../constants";
import {useRouter} from "next/router";
import {AuthContext} from "../contexts/auth";

const Login: NextPage = () => {
  const router = useRouter()
  const {setAccessToken, setRefreshToken} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = ({username, password}: any) => {
    setIsLoading(true)
    // Login the guy
    axios.post(`/api/token/`, {
      username,
      password
    }, {
      ...defaultOptions,
      baseURL: BASE_BACKEND_URL
    })
      .then(({data: {access, refresh}}: any) => {
        // Save token to localStorage
        setAccessToken(access)
        setRefreshToken(refresh)

        // Redirect to home page
        router.push('/')
      }).catch(err => {
        console.log(err)
        setError(err.message)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    console.log("on mount")
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Grill My Player</title>
        <meta name="description" content="Grill My Player" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Name: </label>
            <input type="text" id='username' {...register("username")}/>
            <label htmlFor="password">Password: </label>
            <input type="password" id='password' {...register("password")}/>
            <button>Login</button>
          </form>
        </div>
        <div>
          {
            error && (
              <div style={{color: 'red'}}>Data is incorrect</div>
            )
          }
        </div>
      </main>

      <footer className={styles.footer}>
        Created by Bartłomiej & Marcin
      </footer>
    </div>
  )
}

export default Login
