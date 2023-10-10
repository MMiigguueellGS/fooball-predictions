import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import Fixture from "./Fixture";
import DistributionPoisson from "./Components/DistributionPoisson";
const ls = localStorage;
function App() {
  const [country, setCountry] = useState(""); //se guarda el pais seleccionado en el select de paises
  const [leagueCurrent, setleagueCurrent] = useState([]); //se guarda datos de  liga seleccionada en el select ID;Nombrede liga ; temporada, y pais
  const [leaguesByCountry, setLeaguesByCountry] = useState([]); // guarda la lista de las ligas x ciudad  , es lo que se ve en el select de ligas
  const [fixture, setFixture] = useState([]); //guarda el fixture dela liga seleccionada

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
    const leaguesByCountry = addLeaguesSelect(e.target.value);
    setLeaguesByCountry(leaguesByCountry);
  };

  //aca seleciono la liga y guardo en el estado leagueCurrent los datos de esa liga ID;Nombrede liga ; temporada, y pais
  const onChangeLeagueSelect = (e) => {
    console.log(e.target.value);
    const idLeague = e.target.value;
    const leagueCurrent = leaguesCurrent.find(
      (league) => Number(league.id) === Number(idLeague)
    );

    setleagueCurrent(leagueCurrent);
    ls.setItem("leagueCurrent", JSON.stringify(leagueCurrent));
  };

  //-----------------------------------

  function addLeaguesSelect(country) {
    const leaguesByCountry = [];
    leaguesCurrent.forEach((league) => {
      if (league.country === country) {
        leaguesByCountry.push({
          league: league.league,
          id: league.id,
        });
      }
    });
    return leaguesByCountry;
  }

  //---------------------------------------

  const handleRequest = () => {
    const headers = {
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "f2644de95c12ea7a21cdf3b27aa29ef0",
      },
    };
    const url = "https://v3.football.api-sports.io/leagues?current=true";
    axios
      .get(url, headers)
      .then(({ data }) => ls.setItem("leagues", JSON.stringify(data.response)))
      .catch((err) => console.log(err));
  };
  //----------------------------------------------
  const handleClickFixture = () => {
    const headers = {
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "f2644de95c12ea7a21cdf3b27aa29ef0",
      },
    };
    const url = `https://v3.football.api-sports.io/fixtures?league=${leagueCurrent.id}&season=2023`;
    axios
      .get(url, headers)
      .then(({ data }) => {
        ls.setItem("fixture", JSON.stringify(data.response));
        setFixture(data.response);
      })
      .catch((err) => console.log(err));
  };

  //------------------- esto me trae todas de las ligas y temporadas actuales guardatas en el LOCAL STORAGE--------------------------------

  const leagues = JSON.parse(ls.getItem("leagues"));
  const leaguesCurrent = [];
  if (leagues) {
    leagues.forEach((league) => {
      if (league.seasons[0].coverage.standings) {
        leaguesCurrent.push({
          country: league.country.name,
          league: league.league.name,
          id: league.league.id,
          season: league.seasons[0].year,
        });
      }
    });
  }

  //-------------------------sto me trae data de la liga a pronosticar-------------------------------------
  useEffect(() => {
    const fixture = JSON.parse(ls.getItem("fixture"));

    if (fixture) {
      const leagueCurrent = JSON.parse(ls.getItem("leagueCurrent"));
      setleagueCurrent(leagueCurrent);
      setFixture(fixture);
    }
  }, []);

  return (
    <>
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
      <h1 className="my-4 flex gap-4 justify-center">
        {" "}
        <span>
          {" "}
          PAIS{" "}
          <span className="text-xl text-red-500 font-semibold">
            {leagueCurrent.country}
          </span>
        </span>{" "}
        <span>
          LIGA{" "}
          <span className="text-xl text-red-500 font-semibold">
            {leagueCurrent.league}
          </span>
        </span>
      </h1>
      <DistributionPoisson fixture={fixture} />
      {/* <Fixture fixture={fixture} /> */}
    </>
  );
}

export default App;
