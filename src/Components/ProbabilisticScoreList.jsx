import React from "react";
import ProbabilisticScoreListDetail from "./ProbabilisticScoreListDetail";
import TeamOverAndUnder from "./TeamOverAndUnder";

const ProbabilisticScoreList = ({
  expectedHomeGoals,
  expectedAwayGoals,
  poissonProbability,
  teamHome,
  teamAway
}) => {

  const expectedGoal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];


  // obtengo una lista con las probabilidades de los goles esperados del local
  const goalProbabilitiesHomeList = expectedGoal.map((goal) => {
    const poisson = poissonProbability(goal, expectedHomeGoals);

    return {
      goal: goal,
      probability: poisson,
    };
  });

  
  // obtengo una lista con las probabilidades de los goles esperados del local
  const goalProbabilitiesAwayList = expectedGoal.map((goal) => {
    const poisson = poissonProbability(goal, expectedAwayGoals);

    return {
      goal: goal,
      probability: poisson,
    };
  });

  return (
    <div className="grid gap-10 justify-center bg-black-opacity p-8 " >
      
        <ProbabilisticScoreListDetail
          goalProbabilitiesHomeList={goalProbabilitiesHomeList}
          goalProbabilitiesAwayList={goalProbabilitiesAwayList}
        />

        <TeamOverAndUnder goalProbabilitiesHomeList={goalProbabilitiesHomeList}
          goalProbabilitiesAwayList={goalProbabilitiesAwayList} 
          teamHome={teamHome}
          teamAway={teamAway}
          />
      
    </div>
  );
};

export default ProbabilisticScoreList;
