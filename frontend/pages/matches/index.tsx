import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {defaultOptionsWithAutorization} from "../../lib/axiosConfig";
import Link from "next/link";
import Header from "../../components/Header";
import {AuthContext} from "../../contexts/auth";

const MatchesRoot: NextPage = () => {
  const {accessToken} = useContext(AuthContext)
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`/matches`, defaultOptionsWithAutorization(accessToken))
      .then(res => {
        setMatches(res.data)
        setIsLoading(false)
      }).catch(err => {
        console.log(err)
        setError(err.message)
        setIsLoading(false)
    })
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
        {
          !isLoading ? (
            error ? (
              <h2>{error}</h2>
            ) : (
              (
                <ul>
                  {matches.map(match => (
                    <li key={match.id}>
                      <Link href={`/matches/${match.id}`}>
                        <div style={{border: '1px solid black', margin: '12px', cursor: 'pointer'}}>
                          <h2>{match.teams}</h2>
                          <h4>Date: {match.date}</h4>
                          <h3>Score: {match.score}</h3>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
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

export default MatchesRoot
