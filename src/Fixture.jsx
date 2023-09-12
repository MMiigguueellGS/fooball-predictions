import React from 'react'
import FixtureList from './FixtureList'

const Fixture = ({fixture}) => {

  return (
    <div>
      <ul className=''>
        <li className='grid grid-cols-4 gap-4'>
          <h3>Fecha</h3>
          <h3>Home</h3>
          <h3>Marcador</h3>
          <h3>Away</h3>
        </li>
        {
          fixture.map((game)=><FixtureList key={game.fixture.id} game={game} /> )
        }
      </ul>
    </div>
  )
}

export default Fixture