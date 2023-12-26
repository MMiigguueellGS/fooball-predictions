import React, { useEffect, useState } from "react";
import MatchResultStatus from "./MatchResultStatus";
import ProbabilisticScoreList from "./ProbabilisticScoreList";
import TeamGGoalsStats from "./TeamGGoalsStats";
import { Link } from "react-router-dom";
const ls = localStorage;
const DistributionPoisson = ({ fixture }) => {
  const [averageGoalsAtHome, setAverageGoalAtsHome] = useState({}); //promedios de goles del equipo local selecionado en el select 1
  const [averageGoalsAtAway, setAverageGoalAtsAway] = useState({}); //promedios de goles del equipo visitante selecionado en el select 2
  const [teamHome, setTeamHome] = useState("");
  const [teamAway, setTeamAway] = useState("");
  const [logoHome, setLogoHome] = useState("");
  const [logoAway, setLogoAway] = useState("");
  //cantidad de equipos por liga para agregar al select ( ESCOGE LOS EQUIPOS DE LA LIGA )
  const teamsByLeague = fixture.reduce((uniqueTeams, matche) => {
    const homeTeam = { id: matche.teams.home.id, name: matche.teams.home.name };
    const awayTeam = { id: matche.teams.away.id, name: matche.teams.away.name };
    // Verifica si el equipo de local ya existe en la lista y agregarlo en la lista de equipos
    const existingHomeTeam = uniqueTeams.find(
      (team) => team.id === homeTeam.id
    );
    if (!existingHomeTeam) {
      uniqueTeams.push(homeTeam);
    }
    // Verifica si el equipo visitante ya existe en la lista y agregarlo en la lista de equipos
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

  //calculas el promedio del goles del local con el total de partidos del local
  const handleSelectHomeTeam = (e) => {
    const idHome = e.target.value;
    //escogemos el logo
    const logoHomee = fixture.find(
      (matche) => matche.teams.home.id === Number(idHome)
    );
    setLogoHome(logoHomee.teams.home.logo);
    ls.setItem("logoHome",JSON.stringify(logoHomee.teams.home.logo))
    //encuentro el nombre del equipo local
    const nameTeamHome = fixture.reduce((name, matche) => {
      if (matche.teams.home.id === Number(idHome)) {
        name = matche.teams.home.name;
      }
      return name;
    }, "");
    ls.setItem("nameTeamHome", JSON.stringify(nameTeamHome));
    setTeamHome(nameTeamHome);

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
    console.log(averagesGoalsHome)
    ls.setItem("averagesGoalsHome", JSON.stringify(averagesGoalsHome));
    setAverageGoalAtsHome(averagesGoalsHome);
  };

  //calcula el promedio del goles del visitante con el total de partidos del visitante
  const handleSelectAwayTeam = (e) => {
    const idAway = e.target.value;

    //escogemos el logo
    const logoAwayy = fixture.find(
      (matche) => matche.teams.away.id === Number(idAway)
    );
    //agregamos el logo al localstore
    setLogoAway(logoAwayy.teams.away.logo);
    ls.setItem("logoAway",JSON.stringify(logoAwayy.teams.away.logo))

 
    //encuentro el nombre del equipo visitante
    const nameTeamAway = fixture.reduce((name, matche) => {
      if (matche.teams.away.id === Number(idAway)) {
        name = matche.teams.away.name;
      }
      return name;
    }, "");
    ls.setItem("nameTeamAway", JSON.stringify(nameTeamAway));
    setTeamAway(nameTeamAway);

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
  const homeAttackForce =
    averageGoalsAtHome.averageFavor / averageGoalsAtHomeLeague;
  //FUERZA DE DEFENSA DEL LOCAL
  const homeDefensivForce =
    averageGoalsAtHome.averageContra / averageGoalsAtAwayLeague;

  //FUERZA DE ATAQUE DEL VISITANTE
  const awayAttackForce =
    averageGoalsAtAway.averageFavor / averageGoalsAtAwayLeague;
  //FUERZA DE DEFENSA DEL VISITANTE
  const awayDefensivForce =
    averageGoalsAtAway.averageContra / averageGoalsAtHomeLeague;

  //GOLES ESPERADOS
  const expectedHomeGoals =
    homeAttackForce * awayDefensivForce * averageGoalsAtHomeLeague;
  const expectedAwayGoals =
    awayAttackForce * homeDefensivForce * averageGoalsAtAwayLeague;

 
// FORMULA DE DISTRIBUCION DE POISSON
  function poissonProbability(expectedGoal, expectedGoals) {
    if (expectedGoal < 0) {
      return 0; // La probabilidad nunca puede ser negativa
    }

    const ePowerLambda = Math.exp(-expectedGoals);
    const xFactorial = factorial(expectedGoal);

    const expectedProbability = Number(
      (Math.pow(expectedGoals, expectedGoal) * ePowerLambda) / xFactorial
    );

    return expectedProbability;
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

    const nameTeamHome = JSON.parse(ls.getItem("nameTeamHome"));
    const nameTeamAway = JSON.parse(ls.getItem("nameTeamAway"));

   const logoHome = JSON.parse(ls.getItem("logoHome"))
   const logoAway = JSON.parse(ls.getItem("logoAway"))

    if (averagesGoalsHome) setAverageGoalAtsHome(averagesGoalsHome);
    if (averagesGoalsAway) setAverageGoalAtsAway(averagesGoalsAway);
    if (nameTeamHome) setTeamHome(nameTeamHome);
    if (nameTeamAway) setTeamAway(nameTeamAway);
    if(logoHome) setLogoHome(logoHome)
    if(logoAway) setLogoAway(logoAway)
  }, []);

  return (
    <section className="grid gap-6 justify-center text-white">
      <Link to="/">Regresar</Link>
      <form action="">
        <label htmlFor="">LOCAL </label>
        <select onChange={handleSelectHomeTeam}>
          <option value=""> - selectiona tu equipo - </option>
          {teamsByLeague.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        <label htmlFor="">VISITA </label>
        <select onChange={handleSelectAwayTeam}>
          <option value=""> - selectiona tu equipo - </option>
          {teamsByLeague.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </form>
      <section className="flex items-center justify-center gap-10">
        <div><img src={logoHome} alt="" /></div>
        <div><span>VS</span></div>
        <div><img src={logoAway} alt="" /></div>
      </section>
      <section className="grid  gap-6  bg-black-opacity">
        <TeamGGoalsStats
          teamName={teamHome}
          expectedTeamGoals={expectedHomeGoals}
          isHome={true}
          poissonProbability={poissonProbability}
        />
        <TeamGGoalsStats
          teamName={teamAway}
          expectedTeamGoals={expectedAwayGoals}
          isHome={false}
          poissonProbability={poissonProbability}
        />
      </section>

      <section>
        <MatchResultStatus
          expectedHomeGoals={expectedHomeGoals}
          expectedAwayGoals={expectedAwayGoals}
          poissonProbability={poissonProbability}
        />
      </section>

      <section>
        <ProbabilisticScoreList
          expectedHomeGoals={expectedHomeGoals}
          expectedAwayGoals={expectedAwayGoals}
          poissonProbability={poissonProbability}
          teamHome={teamHome}
          teamAway={teamAway}
        />
      </section>

      <section></section>
    </section>
  );
};

export default DistributionPoisson;
