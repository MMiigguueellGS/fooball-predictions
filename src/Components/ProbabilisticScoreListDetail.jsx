import React from "react";
import OverAndUnderForecasts from "./OverAndUnderForecasts";

const ProbabilisticScoreListDetail = ({
  goalProbabilitiesHomeList,
  goalProbabilitiesAwayList,
}) => {
  //resultado para cuando son empates
  const scoreDrawProbability = [];
  for (let i = 0; i < goalProbabilitiesHomeList.length; i++) {
    const llave =
      goalProbabilitiesHomeList[i].goal +
      " - " +
      goalProbabilitiesAwayList[i].goal;
    const value =
      goalProbabilitiesHomeList[i].probability *
      goalProbabilitiesAwayList[i].probability;

    scoreDrawProbability.push({
      score: llave,
      probability: value,
    });
  }

  //resultado para cuando  gana local
  const scoreWinnerHomeProbability = [];
  for (let i = 0; i < goalProbabilitiesAwayList.length; i++) {
    for (let j = 0; j < goalProbabilitiesHomeList.length; j++) {
      if (j > i) {
        const llave =
          goalProbabilitiesHomeList[j].goal +
          " - " +
          goalProbabilitiesAwayList[i].goal;
        const value =
          goalProbabilitiesHomeList[j].probability *
          goalProbabilitiesAwayList[i].probability;

        scoreWinnerHomeProbability.push({
          score: llave,
          probability: value,
        });
      }
    }
  }

  //resultado para cuando gana visitante
  const scoreWinnerAwayProbability = [];
  for (let i = 0; i < goalProbabilitiesHomeList.length; i++) {
    for (let j = 0; j < goalProbabilitiesAwayList.length; j++) {
      if (j > i) {
        const llave =
          goalProbabilitiesHomeList[i].goal +
          " - " +
          goalProbabilitiesAwayList[j].goal;
        const value =
          goalProbabilitiesHomeList[i].probability *
          goalProbabilitiesAwayList[j].probability;

        scoreWinnerAwayProbability.push({
          score: llave,
          probability: value,
        });
      }
    }
  }

  return (
    <section className="grid gap-6 justify-center">
      {/* <article className="flex gap-4">
        <ul>
          <h2>victoria local</h2>
          {scoreWinnerHomeProbability.map((score, index) => (
            <li key={index} className="flex gap-4">
              <span className="text-red-500 font-semibold">{score.score}</span>
              <span>{(score.probability * 100).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <ul>
          <h2>Empate</h2>
          {scoreDrawProbability.map((score, index) => (
            <li key={index} className="flex gap-4">
              <span className="text-red-500 font-semibold">{score.score}</span>
              <span>{(score.probability * 100).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <ul>
          <h2>Victoria visitante</h2>
          {scoreWinnerAwayProbability.map((score, index) => (
            <li key={index} className="flex gap-4">
              <span className="text-red-500 font-semibold">{score.score}</span>
              <span>{(score.probability * 100).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </article> */}
      <article className="flex gap-10">
        <OverAndUnderForecasts
          scoreDrawProbability={scoreDrawProbability}
          scoreWinnerHomeProbability={scoreWinnerHomeProbability}
          scoreWinnerAwayProbability={scoreWinnerAwayProbability}
        />
      </article>
      
    </section>
  );
};

export default ProbabilisticScoreListDetail;
