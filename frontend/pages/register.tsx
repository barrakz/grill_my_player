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
import Link from "next/link";
import {toast} from "react-toastify";

const Register: NextPage = () => {
  const router = useRouter()
  const {setAccessToken, setRefreshToken} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = ({username, email, password, password2}: any) => {
    setIsLoading(true)
    // Register the guy
    axios.post(`/api/register/`, {
      username,
      email,
      password,
      password2,
    }, {
      ...defaultOptions,
      baseURL: BASE_BACKEND_URL
    })
      .then(({data: {access, refresh}}: any) => {
        // Save token to localStorage
        setAccessToken(access)
        setRefreshToken(refresh)

        toast.success('Successful register!')

        // Redirect to home page
        router.push('/')
      }).catch(err => {
      console.log(err)
      setError(err.message)
      toast.error(err.message)
      setIsLoading(false)
    })
  }

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
            <div>
              <label htmlFor="username">Username: </label>
              <input type="text" id='username' {...register("username")}/>
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <input type="email" id='email' {...register("email")}/>
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="password" id='password' {...register("password")}/>
            </div>
            <div>
              <label htmlFor="password2">Repeat Password: </label>
              <input type="password" id='password2' {...register("password2")}/>
            </div>
            <button>Register</button>
          </form>
        </div>
        <div>
          {
            error && (
              <div style={{color: 'red'}}>Data is incorrect</div>
            )
          }
        </div>
        <div>already registered ? <Link href={"/login"}><span style={{color: 'green', cursor: 'pointer'}}>Login</span></Link></div>
      </main>

      <footer className={styles.footer}>
        Created by Bartłomiej & Marcin
      </footer>
    </div>
  )
}

export default Register
