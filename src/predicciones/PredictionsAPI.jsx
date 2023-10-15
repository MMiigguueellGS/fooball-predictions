import React from 'react'

const PredictionsAPI = ({fixture}) => {
  console.log(fixture[0].fixture.id)
  const handleRequest = () => {
    const headers = {
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "f2644de95c12ea7a21cdf3b27aa29ef0",
      },
    };
    const url = "https://v3.football.api-sports.io/predictions?fixture=198772";
    axios
      .get(url, headers)
      .then(({ data }) => ls.setItem("leagues", JSON.stringify(data.response)))
      .catch((err) => console.log(err));
  };
  return (
    <div></div>
  )
}

export default PredictionsAPI