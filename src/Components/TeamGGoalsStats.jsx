import React from "react";

const TeamGGoalsStats = ({ teamName, expectedTeamGoals, isHome,poissonProbability }) => {
  //FORMULA PARA DISTRIBUCION DE POISSON

 
 
  const expectedGoal = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <article className="flex gap-6">
      <h2 className="text-center tex">
        {isHome === true ? "Local" : "Visita"}
      </h2>
      <span>{teamName}</span>
      {expectedGoal.map((goal) => (
        <ul key={goal}>
          <li>{goal}</li>
          <li>{(poissonProbability(goal, expectedTeamGoals)*100).toFixed(2)}</li>
        </ul>
      ))}
    </article>
  );
};

export default TeamGGoalsStats;
