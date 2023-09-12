import React from "react";

const FixtureList = ({ game }) => {
  const date = (game.fixture.date).slice(0,10)
  return (
    <li className="grid grid-cols-4 gap-4">
      <span>{date}</span>
      <span>{game.teams.home.name}</span>
      <span>{game.goals.home} - {game.goals.away}</span>
      <span>{game.teams.away.name}</span>
    </li>
  );
};

export default FixtureList;
