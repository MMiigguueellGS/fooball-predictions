import React from "react";

const FixtureList = ({ game }) => {
  const date = game.fixture.date.slice(0, 10);
  return (
    <article className="grid grid-cols-4 gap-4 items-center">
      <span>{date}</span>

      <div className="grid grid-cols-2 justify-center items-center">
        <div className="">
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
      <span className="text-xl">
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
        <div>
          <span>{game.teams.away.name}</span>
        </div>
      </div>
    </article>
  );
};

export default FixtureList;
