import axios from 'axios'
import {defaultOptionsWithAutorization} from "../lib/axiosConfig";


const SampleDataFromBackend = () => {
  const handleClick = () => {
    axios.get(`/players`, defaultOptionsWithAutorization)
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <button onClick={handleClick}>Get All players</button>
    </div>
  )
}

export default SampleDataFromBackend
