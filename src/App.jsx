import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import Fixture from "./Fixture";
import DistributionPoisson from "./Components/DistributionPoisson";
import PredictionsAPI from "./predicciones/PredictionsAPI";
import { Link, Route, Routes } from "react-router-dom";
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
      <Routes>
        <Route
          path="/"
          element={
            <Fixture
              fixture={fixture}
              onChangeCountry={onChangeCountry}
              onChangeLeagueSelect={onChangeLeagueSelect}
              handleRequest={handleRequest}
              handleClickFixture={handleClickFixture}
              leaguesByCountry={leaguesByCountry}
              country={country}
              leagueCurrent={leagueCurrent}
            />
          }
        />
        <Route
          path="/predicciones"
          element={<DistributionPoisson fixture={fixture} />}
        />
      </Routes>

      {/* */}
      {/*  */}
      {/* <PredictionsAPI fixture={fixture} /> */}
    </>
  );
}

export default App;
