import React, { useState } from "react";
import DailyMatchesFixtureList from "./DailyMatchesFixtureList";

const DailyMatchesFixture = () => {
  const [DailyMatches, setDailyMatches] = useState([]);
  function fixtureprueba() {
    //const url ="https://v3.football.api-sports.io/fixtures?date=2023-10-22";// este endpoint me obtiene la programacion de partidos para este fecha
    const url = "https://v3.football.api-sports.io/fixtures?live=all";
    axios
      .get(url, headers)
      .then(({ data }) => setDailyMatches(data.response))
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <button onClick={fixtureprueba}>pruebas</button>
      <section className="grid gap-5 ">
        <ul className="grid  items-center grid-cols-5 gap-4 text-white h-10 bg-gradient-to-r from-cyan-500 to-red-500">
          <li className="text-xl font-semibold">Fecha</li>
          <li className="text-xl font-semibold">Local</li>
          <li className="text-xl font-semibold">Marcador</li>
          <li className="text-xl font-semibold">Visitante</li>
          <li className="text-xl font-semibold">Prediccion API</li>
        </ul>
        <section className="grid gap-4 ">
          {DailyMatches.map((game) => (
            <DailyMatchesFixtureList key={game.fixture.id} game={game} />
          ))}
        </section>
      </section>
    </div>
  );
};

export default DailyMatchesFixture;
