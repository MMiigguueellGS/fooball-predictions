import React from "react";
import { Link } from "react-router-dom";

const FixtureList = ({ game,prediction }) => {
  const date = game.fixture.date.slice(0, 10);

  // objeto con los colores , de acuerdo al resultado
  const color = {
    win: "text-emerald-600",
    lose: "text-[#dd0025]",
    draw: " text-[#F18F01]",
  };
  // resultados que sirven para pintar  
  const winHome =game.goals.home >game.goals.away 
  const loseHome =game.goals.home<game.goals.away  
  const draw =game.goals.home === game.goals.away 

  return (
    <article className="grid grid-cols-5 gap-4 items-center">
      <span className="text-black">{date}</span>

      <div className="grid grid-cols-2 justify-center items-center  ">
        <div className={`${winHome&&color.win} ${loseHome&&color.lose} ${draw&&color.draw}  font-semibold`}>
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
        <div className={`${winHome&&color.lose} ${loseHome&&color.win} ${draw&&color.draw} font-semibold`}>
          <span>{game.teams.away.name}</span>
        </div>
      </div>
      <div>
        <button onClick={()=>prediction(game.fixture.id)} className="bg-sky-700/50 p-2 " to="">Ver prediccion</button>
      </div>
    </article>
  );
};

export default FixtureList;
