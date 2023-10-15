import React from "react";
import FixtureList from "./FixtureList";
import { Link } from "react-router-dom";

const Fixture = ({
  fixture,
  onChangeCountry,
  onChangeLeagueSelect,
  handleRequest,
  handleClickFixture,
  leaguesByCountry,
  country,
  leagueCurrent,
}) => {
  return (
    <div>
      <button
        onClick={handleRequest}
        className="p-2 px-4 rounded-2xl bg-red-500 text-white mr-4"
      >
        Traer Datos
      </button>

      <select onChange={onChangeCountry} value={country}>
        <option value=""> -- Seleccione un país --</option>
        <option value="Peru">Peru</option>
        <option value="Spain">España</option>
        <option value="England">Inglaterra</option>
        <option value="Italy">Italia</option>
        <option value="Germany">Alemania</option>
        <option value="France">Francia</option>
        <option value="Brazil">Brasil</option>
        <option value="Argentina">Argentina</option>
        <option value="Mexico">México</option>
        <option value="Japan">Japón</option>
        <option value="Netherlands">Países Bajos</option>
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

      <ul className="">
        <li className="grid grid-cols-4 gap-4">
          <h3>Fecha</h3>
          <h3>Home</h3>
          <h3>Marcador</h3>
          <h3>Away</h3>
        </li>
        {fixture.map((game) => (
          <FixtureList key={game.fixture.id} game={game} />
        ))}
      </ul>
    </div>
  );
};

export default Fixture;
