import React from 'react'

const MatchResultStatus = ({expectedHomeGoals,expectedAwayGoals,poissonProbability}) => {
  

 

  function calculateProbabilityWinner (arrayProduct ,arraySum){
    let sum =0
    for(let i=0;i<arraySum.length-1;i++){
      sum = sum + arrayProduct[i]*arraySum.slice(i+1).reduce((sum,elem)=>sum+elem,0)
    }   
    return sum
  }
 
 function calculateProbabilityDraw(home, away){
  let sum =0
    for(let i=0;i<home.length-1;i++){
      sum = sum + home[i]*away[i]
    }   
    return sum
 }
 


 // arreglo con los goles a analisar
  const expectedGoal = [0, 1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13];


  //obter un array con las probalidades para cada opcion de gol del local
  const arrayExpectedHomeGoals = expectedGoal.map((goal)=>poissonProbability(goal, expectedHomeGoals))


//obter un array con las probalidades para cada opcion de gol del visitante
  const arrayExpectedAwayGoals = expectedGoal.map((goal)=>poissonProbability(goal, expectedAwayGoals))

  // probabilidad que el local gane
  const homeTeamWinProbability = calculateProbabilityWinner(arrayExpectedAwayGoals,arrayExpectedHomeGoals)*100

  // probabilidad que la visita gane
  const awayTeamWinProbability = calculateProbabilityWinner(arrayExpectedHomeGoals,arrayExpectedAwayGoals)*100

  //probabilidad que el partido quede empatado
  const drawProbability  = calculateProbabilityDraw(arrayExpectedHomeGoals,arrayExpectedAwayGoals)*100

  return (
    <div>

      <h2>victoria local : {homeTeamWinProbability.toFixed(2)}</h2>
      <h2>victoria visita : {awayTeamWinProbability.toFixed(2)}</h2>
      <h2>empate : {drawProbability.toFixed(2)}</h2>
    </div>
  )
}

export default MatchResultStatus