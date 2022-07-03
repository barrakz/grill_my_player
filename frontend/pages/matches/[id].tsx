import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import Header from "../../components/Header";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import {defaultOptionsWithAutorization} from "../../lib/axiosConfig";

const MatchDetail: NextPage = (props) => {
  const {query: { id }} = useRouter()
  const [match, setMatch] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if(id) {
      setIsLoading(true);
      axios.get(`/match-detail/${id}`, defaultOptionsWithAutorization)
        .then(res => {
          setMatch(res.data)
          setIsLoading(false)
        }).catch(err => {
        console.log(err)
        setError(err.message)
        setIsLoading(false)
      })
    }
  }, [id])

  return (
    <div className={styles.container}>
      <Head>
        <title>Grill My Player</title>
        <meta name="description" content="Grill My Player" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        {
          !isLoading ? (
            error ? (
              <h2>{error}</h2>
            ) : (
              (
                <div>
                  <h2>{match.teams}</h2>
                  <h4>Date: {match.date}</h4>
                  <h3>Score: {match.score}</h3>
                </div>
              )
            )
          ) : (
            <div>Loading...</div>
          )
        }
      </main>

      <footer className={styles.footer}>
        Created by Bartłomiej & Marcin
      </footer>
    </div>
  )
}

export default MatchDetail
