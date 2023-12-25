import React, { useEffect, useState } from "react";
import DailyMatchesFixtureList from "./DailyMatchesFixtureList";
import axios from "axios";
import { format } from "date-fns";
import { stringify } from "postcss";
// import { es } from "date-fns/locale";

const DailyMatchesFixture = () => {
  const [DailyMatches, setDailyMatches] = useState([]);
  const [search, setSearch] = useState("");
  const [searchLeague, setSearchLeague] = useState("");

  const handleSearch = (e) => {
    const searchIinput = e.target.value;

    setSearch(searchIinput);
  };
  const handleSearchLeague = (e) => {
    const searchIinput = e.target.value;
    setSearchLeague(searchIinput);
    const DailyMatchesFilter = JSON.parse(localStorage.getItem("DailyMatches"));
    if (DailyMatchesFilter) {
      const matches = DailyMatchesFilter.filter((game) => {
        const inputLower = searchIinput
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const leagueName = game.league.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return leagueName.includes(inputLower);
      });
      setDailyMatches(matches);
    }
  };

  const headers = {
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "f2644de95c12ea7a21cdf3b27aa29ef0",
    },
  };
  const dateList = (valor) => {
    const currentDate = new Date();
    // Clona la fecha actual para no modificar la original
    const modifiedDate = new Date(currentDate);
    // Suma o resta días según tus necesidades
    modifiedDate.setDate(currentDate.getDate() + valor); // Para sumar un día
    // Formatea la fecha modificada según tus necesidades
    const formattedModifiedDate = format(modifiedDate, "yyyy-MM-dd");
    return formattedModifiedDate;
  };
  function fixtureForDay(date) {
    const url = `https://v3.football.api-sports.io/fixtures?date=${date}`; // este endpoint me obtiene la programacion de partidos para este fecha
    // const url = "https://v3.football.api-sports.io/fixtures?live=all";
    axios
      .get(url, headers)
      .then(({ data }) => {
        setDailyMatches(data.response);
        localStorage.setItem("DailyMatches", JSON.stringify(data.response));
      })
      .catch((err) => console.log(err));
  }
useEffect(() => {
  const currentMatches = JSON.parse(localStorage.getItem("DailyMatches"))
 if(currentMatches){
  setDailyMatches(currentMatches)
 }
}, [])

  return (
    <div>
      <section className="grid gap-5 ">
        <ul className="grid  items-center grid-cols-5 gap-4 text-white h-10 bg-gradient-to-r from-cyan-500 to-red-500">
          <li
            onClick={() => fixtureForDay(dateList(-2))}
            className="text-xl font-light cursor-pointer"
          >
            {dateList(-2)}
          </li>
          <li
            onClick={() => fixtureForDay(dateList(-1))}
            className="text-xl font-light cursor-pointer"
          >
            {dateList(-1)}
          </li>
          <li
            onClick={() => fixtureForDay(dateList(0))}
            className="text-xl font-light cursor-pointer"
          >
            {dateList(0)}{" "}
          </li>
          <li
            onClick={() => fixtureForDay(dateList(+1))}
            className="text-xl font-light cursor-pointer"
          >
            {dateList(+1)}
          </li>
          <li
            onClick={() => fixtureForDay(dateList(+2))}
            className="text-xl font-light cursor-pointer"
          >
            {dateList(+2)}{" "}
          </li>
        </ul>
        <section className="grid  items-center gap-4 bg-gradient-to-r from-cyan-300 to-red-300 ">
          <section className="flex">
            <form className="grid gap-8 sm:flex sm:justify-between w-full mx-auto px-8">
              <div className="p-2  rounded-md flex justify-between gap-4 border-yellow-500 border-b-2  w-[350px] bg-transparent">
                <i className="bx bx-search-alt-2 text-white text-xl "></i>
                <input
                  onChange={handleSearch}
                  type="text"
                  className="outline-none flex-1 bg-white/0 placeholder-white text-white pl-6"
                  placeholder="Buscar por hora ..."
                  value={search}
                />
              </div>
            </form>
            <form className="grid gap-8 sm:flex sm:justify-between w-full mx-auto px-8">
              <div className="p-2  rounded-md flex justify-between gap-4 border-yellow-500 border-b-2  w-[350px] bg-transparent">
                <i className="bx bx-search-alt-2 text-white text-xl "></i>
                <input
                  onChange={handleSearchLeague}
                  type="text"
                  className="outline-none flex-1 bg-white/0 placeholder-white text-white pl-6"
                  placeholder="Buscar por Liga ..."
                  value={searchLeague}
                />
              </div>
            </form>
          </section>
          <article className="grid grid-cols-8 gap-4 items-center bg-emerald-700">
            <div className="font-light text-2xl text-white">Fecha</div>
            <div className="font-light text-2xl text-white">Hora</div>
            <div className="font-light text-2xl text-white">Local</div>
            <div className="font-light text-2xl text-white">Marcador</div>
            <div className="font-light text-2xl text-white">Visitante</div>
            <div className="font-light text-2xl text-white">Liga</div>
            <div className="font-light text-2xl text-white">Pais</div>
            <div className="font-light text-2xl text-white">Estado</div>
          </article>
          {DailyMatches.map(
            (game) =>
              game.fixture.status.long !== "Match Postponed" && (
                <DailyMatchesFixtureList
                  key={game.fixture.id}
                  game={game}
                  search={search}
                  searchLeague={searchLeague}
                />
              )
          )}
        </section>
      </section>
    </div>
  );
};

export default DailyMatchesFixture;
