import React, { useEffect, useState } from "react";
import FixtureList from "./FixtureList";
import { Link } from "react-router-dom";
const ls = localStorage;
const Fixture = ({
  fixture,
  onChangeCountry,
  onChangeLeagueSelect,
  handleRequest,
  handleClickFixture,
  leaguesByCountry,
  country,
  leagueCurrent,
  countries,
}) => {
  const [teamName, setTeamName] = useState("");
  const [homeOrAway, setHomeOrAway] = useState("");
  const [teamByHomeOrAway, setTeamByHomeOrAway] = useState([]);

  const countriesList = countries.map((country) => country.country.name);
  const uniqueCouuntries = [...new Set(countriesList)].sort((a,b)=>a[0].localeCompare(b[0]));
 
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChangeTeamName = (e) => {
    setTeamName(e.target.value);

    const isHomeOrAwaySelected = homeOrAway !== "";
    const searchValue = e.target.value.toLowerCase();

    const filteredMatches = fixture.filter((match) => {
      const homeName = match.teams.home.name.toLowerCase();
      const awayName = match.teams.away.name.toLowerCase();

      if (isHomeOrAwaySelected) {
        return (
          (homeOrAway === "home" && homeName.includes(searchValue)) ||
          (homeOrAway === "away" && awayName.includes(searchValue))
        );
      } else {
        return homeName.includes(searchValue) || awayName.includes(searchValue);
      }
    });

    setTeamByHomeOrAway(filteredMatches);
  };

  const handleChangeHomeOrAway = (e) => {
    setHomeOrAway(e.target.value);

    if (e.target.value !== "") {
      const TeamHomeOrAway = fixture.filter((match) => {
        if (e.target.value === "home") {
          return match.teams.home.name
            .toLowerCase()
            .includes(teamName.toLowerCase());
        }
        if (e.target.value === "away") {
          return match.teams.away.name
            .toLowerCase()
            .includes(teamName.toLowerCase());
        }
      });
      setTeamByHomeOrAway(TeamHomeOrAway);
    } else {
      // Filtra los partidos en los que el equipo que buscas esté tanto de local como de visitante
      const TeamHomeAndAway = fixture.filter((match) => {
        return (
          match.teams.home.name
            .toLowerCase()
            .includes(teamName.toLowerCase()) ||
          match.teams.away.name.toLowerCase().includes(teamName.toLowerCase())
        );
      });
      setTeamByHomeOrAway(TeamHomeAndAway);
    }
  };

  useEffect(() => {
    const fixture = JSON.parse(ls.getItem("fixture"));

    if (fixture) {
      setTeamByHomeOrAway(fixture);
    }
  }, [fixture]);

  return (
    <div>
      <button
        onClick={handleRequest}
        className="p-2 px-4 rounded-2xl bg-red-500 text-white mr-4"
      >
        Traer Datos
      </button>

      <select onChange={onChangeCountry}>
        <option value=""> -- Seleccione un país --</option>
        {uniqueCouuntries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}

        {/* Puedes agregar más países según tus necesidades */}
      </select>

      <select onChange={onChangeLeagueSelect}>
        <option value=""> -- Seleccione una liga --</option>

        {leaguesByCountry.map((league) => (
          <option key={league.id} value={league.id}>
            {league.league}
          </option>
        ))}
      </select>
      <button
        onClick={handleClickFixture}
        className="p-2 px-4 rounded-2xl bg-blue-500 text-white"
      >
        Fixture
      </button>
      <section className=" flex justify-center items-center gap-4">
        <h1 className="my-4 flex gap-4 justify-center">
          <span>
            PAIS
            <span className="text-xl text-red-500 font-semibold">
              {leagueCurrent.country}
            </span>
          </span>
          <span>
            LIGA
            <span className="text-xl text-red-500 font-semibold">
              {leagueCurrent.league}
            </span>
          </span>
        </h1>
        <Link to="/predicciones">Ir a predicciones</Link>
      </section>

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 sm:flex sm:justify-between max-w-[1200px] mx-auto"
      >
        <div className="ligthTheme p-4 rounded-md flex items-center gap-2 darkTheme sm:w-[360px]">
          <i className="bx bx-search-alt-2 text-dark-gray text-lg"></i>
          <input
            id="teamName"
            className="outline-none flex-1 bg-white/0"
            placeholder="buscar por equipo..."
            type="text"
            autoComplete="off"
            onChange={handleChangeTeamName}
            value={teamName}
          />
        </div>

        <select
          onChange={handleChangeHomeOrAway}
          className="outline-none font-nunito-sans ligthTheme  rounded-md max-w-[140px] darkTheme"
        >
          <option value="">Local/Visitante</option>
          <option value="home">Local</option>
          <option value="away">Visitante</option>
        </select>
      </form>
      <section className="grid gap-5 ">
        <ul className="grid  items-center grid-cols-5 gap-4 text-white h-10 bg-gradient-to-r from-cyan-500 to-red-500">
          <li className="text-xl font-semibold">Fecha</li>
          <li className="text-xl font-semibold">Local</li>
          <li className="text-xl font-semibold">Marcador</li>
          <li className="text-xl font-semibold">Visitante</li>
          <li className="text-xl font-semibold">Prediccion API</li>
        </ul>

        <section className="grid gap-4 ">
          {teamByHomeOrAway.map((game) => (
            <FixtureList key={game.fixture.id} game={game} />
          ))}
        </section>
      </section>
    </div>
  );
};

export default Fixture;
