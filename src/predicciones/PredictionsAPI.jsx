import React from 'react'

const PredictionsAPI = ({dataPredictions}) => {
  console.log(dataPredictions)
  console.log("hola")
  
  return (
    <secction className>
      <article className='flex gap-8 items-center'>
        <div className=''> <span>{dataPredictions[0].teams.home.name}</span><img src={dataPredictions[0].teams.home.logo} alt="" /></div>
        <span>VS</span>
        <div  className=''><span>{dataPredictions[0].teams.away.name}</span><img src={dataPredictions[0].teams.away.logo} alt="" /></div>
      </article>
      <article className='grid  gap-4'>
        <h2>goles probables</h2>
       <section className='flex justify-around gap-8'>
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
        <div>
        <span>RESULTADO : </span>
        <span className='text-green-700'>{dataPredictions[0].predictions.winner.comment}</span>
        <span>  {dataPredictions[0].predictions.winner.name}</span>
        </div>
      
      </article>
    </secction>
  )
}

export default PredictionsAPI