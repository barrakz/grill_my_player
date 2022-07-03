import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import Header from "../../components/Header";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import {defaultOptionsWithAutorization} from "../../lib/axiosConfig";

const PlayerDetail: NextPage = (props) => {
  const {query: { id }} = useRouter()
  const [matches, setMatches] = useState<any[]>([]);
  const [playerRatings, setPlayerRatings] = useState<any>([]);
  const [playerDetails, setPlayerDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if(id) {
      setIsLoading(true);
      axios.get(`/player-detail/${id}`, defaultOptionsWithAutorization)
        .then(res => {
          setPlayerDetails(res.data)
          setIsLoading(false)
        }).catch(err => {
        console.log(err)
        setError(err.message)
        setIsLoading(false)
      })
    }
  }, [id])

  useEffect(() => {
    if(id) {
      setIsLoading(true);
      axios.get(`/ratings/`, defaultOptionsWithAutorization)
        .then(res => {
          const filteredData = res.data
            .filter((rating: any) => Number(rating.player) === Number(id))

          setPlayerRatings(filteredData)
          setIsLoading(false)
        }).catch(err => {
        console.log(err)
        setError(err.message)
        setIsLoading(false)
      })
    }
  }, [id])

  useEffect(() => {
    setIsLoading(true);
    axios.get(`/matches`, defaultOptionsWithAutorization)
      .then(res => {
        setMatches(res.data)
        setIsLoading(false)
      }).catch(err => {
      console.log(err)
      setError(err.message)
      setIsLoading(false)
    })
  }, [])

  const getMatchName = (matchId: number): string => {
    return matches.find((match: any) => match.id === matchId)?.teams
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
        {
          !isLoading ? (
            error ? (
              <h2>{error}</h2>
            ) : (
              (
                <div>
                  <h2>This are rating for player: {playerDetails.name} {playerDetails.last_name}</h2>
                  <h3>His / Her average rating is: {playerDetails.average_rating}</h3>
                  <ul>
                    {playerRatings.map((rating: any) => (
                      <li key={rating.id} style={{margin: '12px'}}>
                        <div><strong>Rate:</strong> {rating.rate} </div>
                        <div><strong>Comments:</strong> {rating.comment_text} </div>
                        <div>For match: {getMatchName(rating.match)}</div>
                      </li>
                    ))}
                  </ul>
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

export default PlayerDetail
