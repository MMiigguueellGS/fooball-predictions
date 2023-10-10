import React from 'react'

const TeamOverAndUnderListAway = ({goalProbabilitiesAwayList,underOverValues,teamAway}) => {

  function underAwayProbabilities(scores, value) {
    
    const sumunderValuesProbabilities = scores.reduce((sum, score) => {
      if (value>score.goal) {
        return score.probability + sum;
      }
      return sum
    }, 0);

    // console.log(sumunderValuesProbabilities)
    return sumunderValuesProbabilities;
  }
  
  function overAwayProbabilities(scores, value) {
    
    const sumunderValuesProbabilities = scores.reduce((sum, score) => {
      if (value<score.goal) {
        return score.probability + sum;
      }
      return sum
    }, 0);

    // console.log(sumunderValuesProbabilities)
    return sumunderValuesProbabilities;
  }
  return (
    <div  className='grid gap-2 columns-2'>
      <h2 className='bg-red-500 text-white col-span-2'>{teamAway}</h2>
      <ul>
      <h2>Under / Menos </h2>
      {underOverValues.map((value) => (
        <li className="flex gap-4" key={value}>
          <span>{" - " + value}</span>
          <span>{(underAwayProbabilities(goalProbabilitiesAwayList, value)*100).toFixed(2)}</span>
        </li>
      ))}
    </ul>
    <ul>
      <h2>Over / Mas </h2>
      {underOverValues.map((value) => (
        <li className="flex gap-4" key={value}>
          <span>{" + " + value}</span>
          <span>{(overAwayProbabilities(goalProbabilitiesAwayList, value)*100).toFixed(2)}</span>
        </li>
      ))}
    </ul>
    </div>
  )
}

export default TeamOverAndUnderListAway