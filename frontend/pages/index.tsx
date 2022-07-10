import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from "next/link";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Grill My Player</title>
        <meta name="description" content="Grill My Player" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isHome={true} />

      <main className={styles.main}>
        <h1 className={styles.grillTitle}>Grill My Player</h1>
        <ul className={styles.links}>
          <li>
            <Link href={'/players'}>Players</Link>
          </li>
          <li>
            <Link href={'/matches'}>Matches</Link>
          </li>
        </ul>
      </main>

      <footer className={styles.footer}>
        Created by Bartłomiej & Marcin
      </footer>
    </div>
  )
}

export default Home
