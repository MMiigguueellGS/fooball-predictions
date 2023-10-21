import React from "react";

const TeamGGoalsStats = ({ teamName, expectedTeamGoals, isHome,poissonProbability }) => {
  //FORMULA PARA DISTRIBUCION DE POISSON

 
 
  const expectedGoal = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <article className="flex gap-6 items-center justify-around">
      <h2 className="text-center tex">
        {isHome === true ? "Local" : "Visita"}
      </h2>
      <span>{teamName}</span>
     <section className="flex gap-6 ">
     {expectedGoal.map((goal) => (
        <article className=" grid gap-4 " key={goal}>
          <span>{goal}</span>
          <span>{(poissonProbability(goal, expectedTeamGoals)*100).toFixed(2)}</span>
        </article>
      ))}
     </section>
    </article>
  );
};

export default TeamGGoalsStats;
