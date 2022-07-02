import {useEffect} from "react";
import axios from "axios";

const makeRequest = async (url) => {
  const res: any = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
  }).then((res) => res)

  return res
}

const SampleDataFromBackend = () => {
  useEffect(() => {
    // fetch('api/player-api/twoja-stara', {
    //   method: "GET"
    // })
    //   .then(response => {
    //     console.log("This is our sample response to the server")
    //   })
    //   .catch(error => {
    //     console.log("Error happened!")
    //     console.log(error)
    //   })

    makeRequest('/backend/')
      .then(response => {
        console.log("This is our sample response to the server")
      })
      .catch(error => {
        console.log("Error happened!")
        console.log(error)
      })


  }, [])

  const handleClick = () => {
    axios.get('/backend/')
      .then(response => {
        console.log("This is our sample response to the server")
      })
      .catch(error => {
        console.log("Error happened!")
        console.log(error)
      })
  }

  const handleClickFetch = () => {
    fetch('/backend/', {
      method: "GET"
    })
      .then(response => {
        console.log(response)
        console.log("This is our sample response to the server")
      })
      .catch(error => {
        console.log("Error happened!")
        console.log(error)
      })
  }

  return (
    <div>
      <button onClick={handleClick}>twoja stara axios</button>
      <button onClick={handleClickFetch}>twoja stara fetch</button>
      this is data
    </div>
  )
}

export default SampleDataFromBackend
