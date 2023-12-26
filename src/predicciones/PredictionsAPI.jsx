import React from 'react'

const PredictionsAPI = ({dataPredictions}) => {
  console.log(dataPredictions)
  console.log(dataPredictions[0].predictions.winner.comment)
  console.log("hola")
  
  return (
    <secction className="grid grid-rows-[repeat(3,_min-content)] bg-black-opacity text-white h-auto justify-center items-center">
      <article className='flex justify-center'>
        <div className=''> <span>{dataPredictions[0].teams.home.name}</span><img className="w-[150px]" src={dataPredictions[0].teams.home.logo} alt="" /></div>
        <span>VS</span>
        <div  className=''><span>{dataPredictions[0].teams.away.name}</span><img className="w-[150px]"  src={dataPredictions[0].teams.away.logo} alt="" /></div>
      </article>
      <article className='  '>
        <h2>goles probables</h2>
       <section className=''>
       <div className='text-2xl'>
          <span>Local</span>
          <div>{dataPredictions[0].predictions.goals.home}</div>
          </div>
        <div className='text-2xl'>
          <span>Visitante</span>
          <div>{dataPredictions[0].predictions.goals.away}</div>
          </div>
       </section>
      </article>
      <article >
        <h2>Resultados</h2>
        <div>
          <span>Under - Over</span>
          <span>{dataPredictions[0].predictions.under_over}</span>
        </div>
        <div className='grid'>
        <span>RESULTADO : </span>
        <span>  {dataPredictions[0].predictions.winner.name}</span>
        <span className='text-white'>{dataPredictions[0].predictions.advice}</span>
        </div>
      
      </article>
    </secction>
  )
}

export default PredictionsAPI