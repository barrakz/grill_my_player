import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import Header from "../../components/Header";
import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {defaultOptionsWithAutorization} from "../../lib/axiosConfig";
import {AuthContext} from "../../contexts/auth";

import { toast } from 'react-toastify';


const getPlayersList = (accessToken: any) => {
  return axios.get(`/players`, defaultOptionsWithAutorization(accessToken))
    .then(res => {
      return res.data
    }).catch(err => {
      console.log(err)
    })
}

const MatchDetail: NextPage = (props) => {
  const {query: { id }} = useRouter()
  const {accessToken} = useContext(AuthContext)
  const [match, setMatch] = useState<any>({});
  const [matchPlayers, setMatchPlayers] = useState<any>([])
  const [info, setInfo] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if(id) {
      setIsLoading(true);
      axios.get(`/match-detail/${id}`, defaultOptionsWithAutorization(accessToken))
        .then(res => {
          console.log(res.data)

          getPlayersList(accessToken)
            .then(players => {
              const filteredPlayers = players.filter((player: any) => res.data.player.includes(player.id))
              setMatchPlayers(filteredPlayers)

              setMatch(res.data)
              setIsLoading(false)
            })
            .catch(err => {
              console.log(err)
              setError(err.message)
              toast.error(err.message)
              setIsLoading(false)
            })


        }).catch(err => {
          console.log(err)
          setError(err.message)
          toast.error(err.message)
          setIsLoading(false)
        })
    }
  }, [id])

  const rate = (rate: number, playerId: number, matchId: number) => {
    const ratingData = {
      player: playerId,
      rate,
      comment_text: '',
      match: matchId
    }

    axios.post(`/ratings/`, ratingData, defaultOptionsWithAutorization(accessToken))
      .then(res => {
        const ratedPlayer = matchPlayers.find((player: any) => player.id === res.data.player)
        const filteredPlayers = matchPlayers.filter((player: any) => player.id !== ratedPlayer.id)
        setMatchPlayers(filteredPlayers)
        setInfo('Nice, you rated!')
        toast(`Nice, you rated!  ${ratedPlayer.name} ${ratedPlayer.last_name}`)
      }).catch(err => {
        console.log(err)
        setInfo("Something went wrong")
        toast.error("something went wrong")
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
                  <h2>Players</h2>
                  <ul>
                    {
                      matchPlayers.map((player: any) => {
                        return (
                          <div key={player.id}>
                            <h4>{player.name} {player.last_name}</h4>
                            <ul className={styles.ratingList}>
                              <li onClick={() => rate(1, player.id, match.id)}>1</li>
                              <li onClick={() => rate(2, player.id, match.id)}>2</li>
                              <li onClick={() => rate(3, player.id, match.id)}>3</li>
                              <li onClick={() => rate(4, player.id, match.id)}>4</li>
                              <li onClick={() => rate(5, player.id, match.id)}>5</li>
                              <li onClick={() => rate(6, player.id, match.id)}>6</li>
                              <li onClick={() => rate(7, player.id, match.id)}>7</li>
                              <li onClick={() => rate(8, player.id, match.id)}>8</li>
                              <li onClick={() => rate(9, player.id, match.id)}>9</li>
                              <li onClick={() => rate(10, player.id, match.id)}>10</li>
                            </ul>
                          </div>
                        )
                      })
                    }
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

export default MatchDetail
