import React, { createContext, useEffect, useState } from 'react'


export const AuthContext = createContext<any>(
  undefined
)

const AuthContextProvider = (props: any) => {
  const { children } = props
  const [isLoggedIn, setIsLoggedIn] = useState<any>(false)
  const [accessToken, setAccessToken] = useState<any>('')
  const [refreshToken, setRefreshToken] = useState<any>('')

  useEffect(() => {
    if(typeof window !== undefined) {
      setIsLoggedIn(localStorage.getItem('access'))
    }
    if(accessToken.length > 0) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [refreshToken, accessToken])

  useEffect(() => {
    localStorage.setItem('refresh', refreshToken)
    localStorage.setItem('access', accessToken)
  }, [refreshToken, accessToken])


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
