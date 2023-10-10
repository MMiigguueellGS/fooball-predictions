import React from 'react'
import TeamOverAndUnderListHome from './TeamOverAndUnderListHome';
import TeamOverAndUnderListAway from './TeamOverAndUnderListAway';

const TeamOverAndUnder = ({goalProbabilitiesHomeList,goalProbabilitiesAwayList,teamHome,teamAway}) => {
 
  const underOverValues = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5];

  return (
    <div className='flex gap-10'>
     
     <TeamOverAndUnderListHome goalProbabilitiesHomeList ={goalProbabilitiesHomeList} underOverValues={underOverValues} teamHome={teamHome} />
     <TeamOverAndUnderListAway goalProbabilitiesAwayList ={goalProbabilitiesAwayList} underOverValues={underOverValues} teamAway={teamAway} />

    </div>
  )
}

export default TeamOverAndUnder