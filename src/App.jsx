import axios from "axios";
import "./App.css";
import { useState } from "react";
const ls = localStorage;
function App() {
  const [country, setCountry] = useState("");
  const [leagueID, setLeagueID] = useState("");
  const [leaguesSelect, setLeaguesSelect] = useState([]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
    const leaguesByCountry = addLeagues(e.target.value);
    setLeaguesSelect(leaguesByCountry);
  };
  const onChangeLeague = (e) => {
    setLeagueID(e.target.value);
  };

  //-----------------------------------

  function addLeagues(country) {
    const leaguesByCountry = [];
    leagueCurrent.forEach((league) => {
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
    const url = `https://v3.football.api-sports.io/fixtures?league=${leagueID}&season=2023`;
    axios
      .get(url, headers)
      .then(({ data }) => ls.setItem("fixture", JSON.stringify(data.response)))
      .catch((err) => console.log(err));
  };

  //------------------- esto me trae data de las ligas y temporadas actuales--------------------------------

  const leagues = JSON.parse(ls.getItem("leagues"));
  const leagueCurrent = [];
  leagues.forEach((league) => {
    if (league.seasons[0].coverage.standings) {
      leagueCurrent.push({
        country: league.country.name,
        league: league.league.name,
        id: league.league.id,
        season: league.seasons[0].year,
      });
    }
  });
//-------------------------sto me trae data de la liga a pronosticar-------------------------------------
const leagueToForecast = JSON.parse(ls.getItem("fixture"));
console.log(leagueToForecast)



  return (
    <>
      <button
        onClick={handleRequest}
        className="p-2 px-4 rounded-2xl bg-red-500 text-white"
      >
        peticion
      </button>
      <button
        onClick={handleClickFixture}
        className="p-2 px-4 rounded-2xl bg-blue-500 text-white"
      >
        peticion
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

      <select onChange={onChangeLeague}>
        <option value=""> -- Seleccione una liga --</option>

        {leaguesSelect.map((league) => (
          <option key={league.id} value={league.id}>
            {league.league}
          </option>
        ))}
      </select>
    </>
  );
}

export default App;
