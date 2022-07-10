import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {defaultOptionsWithAutorization} from "../../lib/axiosConfig";
import Header from "../../components/Header";
import {AuthContext} from "../../contexts/auth";
import Link from "next/link";
import {toast} from "react-toastify";

const PlayersRoot: NextPage = () => {
  const {accessToken} = useContext(AuthContext)
  const [players, setPlayers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`/players`, defaultOptionsWithAutorization(accessToken))
      .then(res => {
        setPlayers(res.data)
        setIsLoading(false)
      }).catch(err => {
        console.log(err)
        setError(err.message)
        toast.error(err.message)
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
                  {players.map(player => (
                    <li key={player.id}>
                      <Link href={`/players/${player.id}`}>
                        <div style={{cursor: 'pointer'}}>
                          {player.name} {player.last_name} - avg rating: <strong>{player.average_rating}</strong>
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

export default PlayersRoot
