import React from 'react'

const TeamOverAndUnderListHome = ({goalProbabilitiesHomeList,underOverValues,teamHome}) => {

  function underHomeProbabilities(scores, value) {
    
    const sumunderValuesProbabilities = scores.reduce((sum, score) => {
      if (value>score.goal) {
        return score.probability + sum;
      }
      return sum
    }, 0);

    // console.log(sumunderValuesProbabilities)
    return sumunderValuesProbabilities;
  }
  
  function overHomeProbabilities(scores, value) {
    
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
    <div className='grid gap-2 columns-2 justify-center items-center'>
    <h2 className='bg-gradient-to-r from-blue-500 to-cyan-500 text-white col-span-2'>{teamHome}</h2>
    <ul>
      
      <h2>Under / Menos </h2>
      {underOverValues.map((value) => (
        <li className="flex gap-4" key={value}>
          <span>{" - " + value}</span>
          <span>{(underHomeProbabilities(goalProbabilitiesHomeList, value)*100).toFixed(2)}</span>
        </li>
      ))}
    </ul>
    <ul>
      <h2>Over / Mas </h2>
      {underOverValues.map((value) => (
        <li className="flex gap-4" key={value}>
          <span>{" + " + value}</span>
          <span>{(overHomeProbabilities(goalProbabilitiesHomeList, value)*100).toFixed(2)}</span>
        </li>
      ))}
    </ul>

    </div>
  )
}

export default TeamOverAndUnderListHome