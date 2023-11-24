import React, { useEffect, useState } from 'react'
import DistributionPoisson from '../Components/DistributionPoisson'
import PredictionsAPI from './PredictionsAPI'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Predictions = ({fixture}) => {
  const {id}= useParams()
  const [dataPredictions,setDataPredictions] = useState([]) 
  const headers = {
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "f2644de95c12ea7a21cdf3b27aa29ef0",
    },
  };
  const prediction = (fixtureId)=>{
    
    const url = `https://v3.football.api-sports.io/predictions?fixture=${fixtureId}`;
    axios
      .get(url, headers)
      .then(({ data }) => {
        // ls.setItem("leagues", JSON.stringify(data.response))
        setDataPredictions(data.response)
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    
    prediction(id)
  
    
  }, [])
  
  return (
    <div className=' flex gap-8'>
      <DistributionPoisson fixture={fixture}/>
      {dataPredictions&&
        <PredictionsAPI dataPredictions={dataPredictions}/>
      }
    </div>
  )
}

export default Predictions