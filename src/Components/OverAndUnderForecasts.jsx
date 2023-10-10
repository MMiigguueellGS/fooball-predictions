import React from "react";

const OverAndUnderForecasts = ({
  scoreDrawProbability,
  scoreWinnerHomeProbability,
  scoreWinnerAwayProbability,
}) => {
  const combinedScores = scoreDrawProbability.concat(
    scoreWinnerHomeProbability,
    scoreWinnerAwayProbability
  );

  const combinedScoresSum = combinedScores.map((score) => {
    const scoreString = score.score.split(" - ");

    const scoreSum = Number(scoreString[0]) + Number(scoreString[1]);
    return {
      score: scoreSum,
      probability: score.probability,
    };
  });

  function underValuesProbabilities(scores, value) {
    const sumunderValuesProbabilities = scores.reduce((sum, score) => {
      if (value > score.score) {
        return score.probability + sum;
      }
      return sum;
    }, 0);

    // console.log(sumunderValuesProbabilities)
    return sumunderValuesProbabilities;
  }

  function overValuesProbabilities(scores, value) {
    const sumunderValuesProbabilities = scores.reduce((sum, score) => {
      if (value < score.score) {
        return score.probability + sum;
      }
      return sum;
    }, 0);

    // console.log(sumunderValuesProbabilities)
    return sumunderValuesProbabilities;
  }

  const underOverValues = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5];

  return (
    <div className="grid gap-2 columns-2">
      <h2 className="bg-red-500 text-white col-span-2">PROBABILIDADES X PARTIDO</h2>
      <ul>
        <h2>Under / Menos </h2>
        {underOverValues.map((value) => (
          <li className="flex gap-4" key={value}>
            <span>{" - " + value}</span>
            <span>
              {(
                underValuesProbabilities(combinedScoresSum, value) * 100
              ).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <ul>
        <h2>Over / Mas </h2>
        {underOverValues.map((value) => (
          <li className="flex gap-4" key={value}>
            <span>{" + " + value}</span>
            <span>
              {(
                overValuesProbabilities(combinedScoresSum, value) * 100
              ).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverAndUnderForecasts;
