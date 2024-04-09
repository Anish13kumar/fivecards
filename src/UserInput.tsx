import { useEffect, useState } from "react";
import PointsEntry from "./PointsEntry";

export default function UserInput() {
  const [inputValue, setInputValue] = useState(0); // State to hold the input value
  const [totalScore, setTotalScore] = useState(240);
  const [playerCount, setPlayerCount] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Parse the input value to a number and update the player count
    const count = inputValue
    const score = totalScore;
    // Check if the count is a number and greater than 0
    if (!isNaN(count) && count > 0) {
      setPlayerCount(count);
      setTotalScore(score);
    } else {
      alert("Please enter a valid number of Players");
    }
    // Optionally, reset the input value after submitting
    // setInputValue("");
    // setTotalScore(0)
  };

  // Update the input value as the user types

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(+e.target.value);
  };

  const handleScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalScore(+e.target.value);
  };

  useEffect(() => {
    window.onbeforeunload = function() {
        return "Data will be lost if you leave the page, are you sure?";
      };
  }, [])
  

  return (
    <>
      {playerCount === 0 && (
        <form onSubmit={handleSubmit} className="inputForm">
          <div>
            <label htmlFor="player" className="label-player">Enter the Number of Players: </label>
            <input
              type="text"
              id="player"
              className="box"
              placeholder="Enter something..."
              value={inputValue}
              onChange={handleChange} // Set the input value to the state
            />
          </div>
          <div>
          <label htmlFor="Points" className="label-player">Enter the Number of Points: </label>
          <input
            type="text"
            id="Points"
            className="box"
            placeholder="Enter something..."
            value={totalScore}
            onChange={handleScore} // Set the input value to the state
          />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      {console.log({ totalScore })}
      {playerCount > 0 && (
        <PointsEntry playerCount={playerCount} totalScore={totalScore} />
      )}
    </>
  );
}
