import React from "react";

const DailyMatchesFixtureList = ({ game,search,searchLeague }) => {
 
  const searchHour = search !== '' ? search :0

  const date = game.fixture.date.slice(0, 10);
  const fecha = game.fixture.timestamp;
  let filter = false
  if (searchLeague === "") {
    filter = true;
 } else if (searchLeague === game.league.name) {
    filter = true;
 }

  const time = new Date(fecha * 1000); // Convertir de segundos a milisegundos

  const horas = time.getHours();
  const minutos = time.getMinutes();
  const segundos = time.getSeconds();
  const color = {
    win: "text-emerald-600",
    lose: "text-[#dd0025]",
    draw: " text-[#F18F01]",
  };
  // resultados que sirven para pintar
  const winHome = game.goals.home > game.goals.away;
  const loseHome = game.goals.home < game.goals.away;
  const draw = game.goals.home === game.goals.away;
  return (
  <>
  {
    searchHour < horas &&
     <article className="grid grid-cols-[repeat(8,_1fr)] gap-4 ">
     <span>
      {date}
    </span>
    <span>
      {horas} : {minutos} : {segundos}
    </span>

    <div className="grid grid-cols-2 justify-center items-center  ">
      <div
        className={`${winHome && color.win} ${loseHome && color.lose} ${
          draw && color.draw
        }  font-semibold`}
      >
        <span>{game.teams.home.name}</span>
      </div>
      <div className="flex justify-center">
        <img
          className="w-[50px] h-[50px]"
          src={game.teams.home.logo}
          alt=""
        />
      </div>
    </div>
    <span className="">
      {game.goals.home} - {game.goals.away}
    </span>
    <div className="grid grid-cols-2 justify-center items-center">
      <div className="flex justify-center">
        <img
          className="w-[50px] h-[50px] "
          src={game.teams.away.logo}
          alt=""
        />
      </div>
      <div
        className={`${winHome && color.lose} ${loseHome && color.win} ${
          draw && color.draw
        } font-semibold`}
      >
        <span>{game.teams.away.name}</span>
      </div>
    </div>
    <div>

      {game.league.name}
    </div>
    <div className="flex justify-center items-center gap-2">
     <div>
      <img className="w-[60px] h-[60px] " src={game.league.flag} alt="" />
     </div>
     <span> {game.league.country}</span>
    </div>
    <div>
      {game.fixture.status.long=== 'Match Postponed'&& "Pospuesto"}
      {game.fixture.status.long=== 'Match Finished'&& "Finalizado"}
      {game.fixture.status.long=== 'Not Started'&& "No Iniciado"}
    </div>
  </article>
  }
  </>
  );
};

export default DailyMatchesFixtureList;
