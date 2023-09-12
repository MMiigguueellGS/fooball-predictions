import React, { useEffect, useState } from "react";
const ls = localStorage;
const DistributionPoisson = ({ fixture }) => {
  const [averageGoalsAtHome, setAverageGoalAtsHome] = useState(0); //goles del equipo local selecionado en el select 1
  const [averageGoalsAtAway, setAverageGoalAtsAway] = useState(0); //goles del equipo visitante selecionado en el select 2
  //cantidad de equipos por liga
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

    const homeTeamGoal = fixture.reduce((sum, matche) => {
      if (
        matche.teams.home.id === Number(idHome) &&
        matche.fixture.status.long === "Match Finished"
      ) {
        sum += matche.goals.home;
        numberHomeMatche++;
      }
      return sum;
    }, 0);
    const averageGoalsHome = homeTeamGoal / numberHomeMatche;

    ls.setItem("averageGoalsHome", averageGoalsHome);
    setAverageGoalAtsHome(averageGoalsHome);
  };

  //calculas el promerio del goles del visitante con el total de partidos del visitante
  const handleSelectAwayTeam = (e) => {
    const idAway = e.target.value;
    let numberAwayMatche = 0;
    const awayTeamGoal = fixture.reduce((sum, matche) => {
      if (
        matche.teams.away.id === Number(idAway) &&
        matche.fixture.status.long === "Match Finished"
      ) {
        sum += matche.goals.away;
        numberAwayMatche++;
      }
      return sum;
    }, 0);
    const averageGoalsAway = awayTeamGoal / numberAwayMatche;

    ls.setItem("averageGoalsAway", averageGoalsAway);
    setAverageGoalAtsAway(averageGoalsAway);
  };

  // ? CALCULANDO LA FUERZA DEL EQUIPO ATACANTE
  // Paso 1: toma el número de goles marcados en casa durante la última temporada por el equipo local (Tottenham: 35) y divídelo entre el número de partidos en casa (35/19): 1,842.

  // Paso 2: divide este valor entre la media de goles marcados en casa por partido de la temporada (1,842/1,492) para obtener una «fuerza atacante» de 1,235.

  // ? PASO 1

  // calculando paso 1  golesDelEquipoLocal/numeroPartidos
  const homeTeamGoalAverage = totalHomeGoals / totalGamesPlayed;
  const awayTeamGoalAverage = totalAwayGoals / totalGamesPlayed;

  useEffect(() => {
    const averageGoalsHome = JSON.parse(ls.getItem("averageGoalsHome"));
    const averageGoalsAway = JSON.parse(ls.getItem("averageGoalsAway"));
    setAverageGoalAtsHome(averageGoalsHome);
    setAverageGoalAtsAway(averageGoalsAway);
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
