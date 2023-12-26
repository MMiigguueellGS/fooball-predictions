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
  prediction,
}) => {
  const [teamName, setTeamName] = useState("");
  const [searchFecha, setsearchFecha] = useState("");
  const [homeOrAway, setHomeOrAway] = useState("");
  const [teamByHomeOrAway, setTeamByHomeOrAway] = useState([]);

  const countriesList = countries.map((country) => country.country.name);
  const uniqueCouuntries = [...new Set(countriesList)].sort((a, b) =>
    a[0].localeCompare(b[0])
  );

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
  const handleChangeDate = (e) => {
    setsearchFecha(e.target.value);
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
    <div className="mt-16 mx-28">
      <button
        onClick={handleRequest}
        className="py-3  bg-green-800 text-white w-full uppercase hover:bg-zinc-400/60"
      >
        Traer Datos
      </button>

     <section className=" grid grid-cols-3">
     <select onChange={onChangeCountry} className="outline-none bg-black-opacity placeholder:text-white text-white text-center py-4"  >
        <option value=""> Seleccione un país </option>
        {uniqueCouuntries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}

        {/* Puedes agregar más países según tus necesidades */}
      </select>

      <select onChange={onChangeLeagueSelect} className="outline-none bg-black-opacity placeholder:text-white text-white text-center py-4">
        <option value="">  Seleccione una liga </option>

        {leaguesByCountry.map((league) => (
          <option key={league.id} value={league.id}>
            {league.league}
          </option>
        ))}
      </select>
      <button
        onClick={handleClickFixture}
        className="col-st p-2 px-4 bg-zinc-400/30  hover:bg-zinc-400/60 text-white "
      >
        Fixture
      </button>
     </section>
      <section className=" flex flex-wrap justify-center items-center gap-10 bg-black-opacity mt-2 py-12">     
          <article className="text-white flex gap-2 items-center ">
            <span>PAIS</span>
            <span className="text-2xl text-red-500 font-semibold">
              {leagueCurrent.country}
            </span>
          </article>
          <article className="text-white flex items-center gap-4">
            <span>LIGA</span>
            <span className="text-2xl text-red-500 font-semibold">
              {leagueCurrent.league}
            </span>
          </article>
    
        {/* <Link to="/predicciones">Ir a predicciones</Link> */}
      </section>

      <section className="bg-estadio bg-contain  text-white ">
        <form
          onSubmit={handleSubmit}
          className="grid gap-8 sm:flex sm:justify-between max-w-[1200px] mx-auto bg-black/40"
        >
          <div className=" p-4 rounded-md flex items-center gap-2  sm:w-[360px] ">
            <i className="bx bx-search-alt-2 text-dark-gray text-lg"></i>
            <input
              id="teamName"
              className="outline-none flex-1 bg-transparent placeholder:text-white"
              placeholder="buscar por equipo..."
              type="text"
              autoComplete="off"
              onChange={handleChangeTeamName}
              value={teamName}
            />
          </div>
          <div className=" p-3 rounded-md flex items-center gap-2  sm:w-[360px] ">
            <i className="bx bx-search-alt-2 text-white text-lg"></i>
            <input
              id="teamName"
              className="outline-none bg-transparent"
              type="date"
              autoComplete="off"
              onChange={handleChangeDate}
              value={searchFecha}
            />
          </div>

          <select
            onChange={handleChangeHomeOrAway}
            className="outline-none font-nunito-sans ligthTheme  rounded-md max-w-[140px]  bg-transparent"
          >
            <option value="">Local/Visitante</option>
            <option value="home">Local</option>
            <option value="away">Visitante</option>
          </select>
        </form>
        <section className="grid gap-5  ">
          <ul className="grid  items-center grid-cols-5 gap-4 text-white  bg-black/30 pb-4 mb-2">
            <li className="text-xl font-semibold">Fecha</li>
            <li className="text-xl font-semibold">Local</li>
            <li className="text-xl font-semibold">Marcador</li>
            <li className="text-xl font-semibold">Visitante</li>
            <li className="text-xl font-semibold">Prediccion API</li>
          </ul>

          <section className="grid gap-4 ">
            {teamByHomeOrAway.map((game) => (
              <FixtureList
                key={game.fixture.id}
                game={game}
                prediction={prediction}
                searchFecha={searchFecha}
              />
            ))}
          </section>
        </section>
      </section>
    </div>
  );
};

export default Fixture;
