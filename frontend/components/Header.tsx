import Link from "next/link";
import styles from '../styles/Home.module.scss'
import {FC, useContext, useState} from "react";
import {AuthContext} from "../contexts/auth";

interface HeaderProps {
  isHome?: boolean
}

const Header: FC<HeaderProps> = (props) => {
  const {isLoggedIn, setRefreshToken, setAccessToken} = useContext(AuthContext)
  const { isHome } = props

  const handleLogout = () => {
    setRefreshToken('')
    setAccessToken('')
  }

  return (
    <header>
      {
        !isHome && <Link href={'/'} className={styles.links}>Go Home</Link>
      }

      <div>
        {
          isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link href={'/login'}>Login</Link>
          )
        }
      </div>
    </header>
  )
}

export default Header
