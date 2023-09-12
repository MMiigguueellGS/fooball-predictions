import React, { useEffect, useState } from "react";
const ls = localStorage;
const DistributionPoisson = ({ fixture }) => {
  const [averageGoalsAtHome, setAverageGoalAtsHome] = useState({}); //promedios de goles del equipo local selecionado en el select 1
  const [averageGoalsAtAway, setAverageGoalAtsAway] = useState({}); //promedios de goles del equipo visitante selecionado en el select 2

  //cantidad de equipos por liga para agregar al select
  const teamsByLeague = fixture.reduce((uniqueTeams, matche) => {
    const homeTeam = { id: matche.teams.home.id, name: matche.teams.home.name };
    const awayTeam = { id: matche.teams.away.id, name: matche.teams.away.name };
    // Verifica si el equipo de local ya existe en la lista
    const existingHomeTeam = uniqueTeams.find(
      (team) => team.id === homeTeam.id
    );
    if (!existingHomeTeam) {
      uniqueTeams.push(homeTeam);
    }
    // Verifica si el equipo visitante ya existe en la lista
    const existingAwayTeam = uniqueTeams.find(
      (team) => team.id === awayTeam.id
    );
    if (!existingAwayTeam) {
      uniqueTeams.push(awayTeam);
    }
    return uniqueTeams;
  }, []);
  //-----------------------------------------------------

  //numero de partidos de liga hasta el momento
  const totalGamesPlayed = fixture.reduce((sum, matche) => {
    if (matche.fixture.status.long === "Match Finished") {
      sum++;
    }
    return sum;
  }, 0);

  //goles totales de los equipos jugando de local
  let totalHomeGoals = 0;
  fixture.forEach((matche) => (totalHomeGoals += matche.goals.home));

  //goles totales de los equipos jugando de visitante
  let totalAwayGoals = 0;
  fixture.forEach((matche) => (totalAwayGoals += matche.goals.away));

  //calculas el promerio del goles del local con el total de partidos del local
  const handleSelectHomeTeam = (e) => {
    const idHome = e.target.value;
    let numberHomeMatche = 0;
    let homeTeamGoalOnContra = 0; // goles en contra jugando de local
    const homeTeamGoal = fixture.reduce((sum, matche) => {
      if (
        matche.teams.home.id === Number(idHome) &&
        matche.fixture.status.long === "Match Finished"
      ) {
        sum += matche.goals.home;
        homeTeamGoalOnContra += matche.goals.away;
        numberHomeMatche++;
      }
      return sum;
    }, 0);
    //goles a favor
    const averageGoalsHomeScored = homeTeamGoal / numberHomeMatche;

    //goles en contra
    const averageGoalsHomeContra = homeTeamGoalOnContra / numberHomeMatche;

    //promedios a favor y en contra
    const averagesGoalsHome = {
      averageFavor: averageGoalsHomeScored,
      averageContra: averageGoalsHomeContra,
    };
    ls.setItem("averagesGoalsHome", JSON.stringify(averagesGoalsHome));
    setAverageGoalAtsHome(averagesGoalsHome);
  };
  console.log(averageGoalsAtHome)
  //calculas el promerio del goles del visitante con el total de partidos del visitante
  const handleSelectAwayTeam = (e) => {
    const idAway = e.target.value;
    let numberAwayMatche = 0;
    let awayTeamGoalOnContra = 0; // goles en contra jugando de local
    const awayTeamGoal = fixture.reduce((sum, matche) => {
      if (
        matche.teams.away.id === Number(idAway) &&
        matche.fixture.status.long === "Match Finished"
      ) {
        sum += matche.goals.away;
        awayTeamGoalOnContra += matche.goals.home;
        numberAwayMatche++;
      }
      return sum;
    }, 0);
    const averageGoalsAway = awayTeamGoal / numberAwayMatche;
    const averageGoalsAwayContra = awayTeamGoalOnContra / numberAwayMatche;

    //promedios a favor y en contra
    const averagesGoalsAway = {
      averageFavor: averageGoalsAway,
      averageContra: averageGoalsAwayContra,
    };
    ls.setItem("averagesGoalsAway", JSON.stringify(averagesGoalsAway));
    setAverageGoalAtsAway(averagesGoalsAway);
  };

  // ? CALCULANDO LA FUERZA DEL EQUIPO ATACANTE
  // Paso 1: toma el número de goles marcados en casa durante la última temporada por el equipo local (Tottenham: 35) y divídelo entre el número de partidos en casa (35/19): 1,842. ESTO ES EL PROMEDIO

  // Paso 2: divide este valor entre la media de goles marcados en casa por partido de la temporada (1,842/1,492) para obtener una «fuerza atacante» de 1,235.

  // ? PASO 1

  // calculando paso 1  golesDelEquipoLocal/numeroPartidos
  const averageGoalsAtHomeLeague = totalHomeGoals / totalGamesPlayed;
  const averageGoalsAtAwayLeague = totalAwayGoals / totalGamesPlayed;

  // ? PASO 2
  //FUERZA DE ATAQUE DEL LOCAL
  const homeAttackForce = averageGoalsAtHome.averageFavor / averageGoalsAtHomeLeague;
  //FUERZA DE DEFENSA DEL LOCAL
  const homeDefensivForce = averageGoalsAtHome.averageContra / averageGoalsAtAwayLeague;

  //FUERZA DE ATAQUE DEL VISITANTE
  const awayAttackForce = averageGoalsAtAway.averageFavor / averageGoalsAtAwayLeague;
  //FUERZA DE DEFENSA DEL VISITANTE  
  const awayDefensivForce = averageGoalsAtAway.averageContra / averageGoalsAtHomeLeague;

  //GOLES ESPERADOS
  const expectedHomeGoals = homeAttackForce * awayDefensivForce * averageGoalsAtHomeLeague
  const expectedAwayGoals = awayAttackForce * homeDefensivForce * averageGoalsAtAwayLeague

 // ----------------------------------------
  //FORMULA PARA DISTRIBUCION DE POISSON

  function poissonProbability(x, lambda) {
    if (x < 0) {
      return 0; // La probabilidad nunca puede ser negativa
    }
  
    const ePowerLambda = Math.exp(-lambda);
    const xFactorial = factorial(x);
  
    return (Math.pow(lambda, x) * ePowerLambda) / xFactorial;
  }
  
  function factorial(n) {
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * factorial(n - 1);
  }
  
// --------------------------------------------

  useEffect(() => {
    const averagesGoalsHome = JSON.parse(ls.getItem("averagesGoalsHome"));
    const averagesGoalsAway = JSON.parse(ls.getItem("averagesGoalsAway"));
    if(averagesGoalsHome) setAverageGoalAtsHome(averagesGoalsHome);
    if(averagesGoalsAway) setAverageGoalAtsAway(averagesGoalsAway);
  }, []);

  return (
    <div className="mb-6">
      <select onChange={handleSelectHomeTeam}>
        <option value=""> - selectiona tu equipo - </option>
        {teamsByLeague.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
      <select onChange={handleSelectAwayTeam}>
        <option value=""> - selectiona tu equipo - </option>
        {teamsByLeague.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistributionPoisson;
