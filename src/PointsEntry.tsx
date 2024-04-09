import React, { useEffect, useState } from "react";

interface Props {
  playerCount: number;
  totalScore: number;
}

interface IPlayer {
  name: string;
  point: number;
  totalPoint?: number;
  currentPoint?: number;
  previousPoint?: number;
  propershow?: number;
}

export default function PointsEntry({ playerCount, totalScore }:Props) {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  // const [finalOutput, setFinalOutput] = useState([]);
  const [log, setlog] = useState([]);
  const [clone, setClone] = useState<IPlayer[]>([]);
  const [winState, setWinState] = useState([])

  const userwinStatus: string[] = []
  // const totalPoint = 300;

  useEffect(() => {
    // Initialize an empty array to hold the new players
    const newPlayers = [];

    for (let index = 0; index < playerCount; index++) {
      // Using synchronous prompt to collect player names
      const playerName =
        prompt(`Enter name for player ${index + 1}`) || `Player ${index + 1}`;
      newPlayers.push({ name: playerName, point: 0 });
    }

    // Update the state once with all new players
    setPlayers(newPlayers);

    // Cleanup function to reset players when component unmounts or before next effect runs
    return () => {
      setPlayers([]);
    };
  }, []); // Dependency array ensures this effect runs only when playerCount changes

  console.log({ players });

  const submitRound = () => {
    const roundPoint: {
      name: string;
      point: number;
      totalPoint: number;
      currentPoint: number;
    }[] = [];
    players.map((player, index) => {
      let iE = document.getElementById(`$player${index}`)?.value;
      player.point += +iE;
      roundPoint.push({
        name: player.name,
        point: player.point,
        totalPoint: player.point,
        currentPoint: +iE,
        previousPoint: +(player.point - iE),
        propershow: +iE === 0 && index+1
      });
      if(+iE === 0){
        userwinStatus.push(player.name)
      }

    console.log({userwinStatus})
        document.getElementById(`$player${index}`).value = parseInt(0, 10);
  
    });
    console.log({ roundPoint });
    // setFinalOutput(roundPoint);
    setClone([...roundPoint]);
    setlog((prev) => [...prev, roundPoint]);
    setWinState((prev) => [...prev, ...userwinStatus]);


    const countOccurrences = (arr) => {
      return arr.reduce((acc, player) => {
        acc[player] = (acc[player] || 0) + 1;
        return acc;
      }, {});
    };
    
    const playerCounts = countOccurrences(winState);
    console.log({winState,playerCounts});
 
  };
  return (
    <>
      <main className="main-area">
        <section className="player-info">
          {players.map((player, index) => (
            <React.Fragment key={index}>
              <p>
                <label>
                  <span className="playerName">{player.name} Points: </span>{" "}
                  <input
                    type="number"
                    id={`$player${index}`}
                    min="0"
                    defaultValue={0}
                    disabled={player.point >= totalScore}
                  />
                </label>
              </p>
              {/* <p>{player.point}</p> */}
            </React.Fragment>
          ))}
          <button onClick={submitRound}>Submit</button>
        </section>
        <section className="Leaderboard">
          <h2>Leaderboard</h2>
          {clone
            .sort((a, b) => b.totalPoint - a.totalPoint)
            .map((x: IPlayer, index) => {
              {
                console.log({winState});
              }
              return (
                <h2
                  key={index}
                  className={x?.totalPoint >= totalScore ? "strick" : undefined}
                >
                 <span className="playerName">{x.name} :</span>{" "}
                  <span className="wrongShow">{x.totalPoint} points </span>{" "}
                  (Remaining:{" "}
                  <span className="winner">{totalScore - x?.totalPoint}</span>)
                </h2>
              );
            })}
        </section>
      </main>
      <section className="main-logs">
        <h2>Points Log</h2>

        <div className="logs">
          {log.map((x: IPlayer, index) => {
            return (
              <section className="roundData-Main">
                <h3>Round {index + 1}</h3>
                <hr />
                <div className="roundData">
                  {x?.map((y, i) => {
                    return (
                      <>
                        {!(y.totalPoint >= totalScore) && (
                          <p
                            key={i}
                            className={
                              (y.currentPoint === 0 ? "winner" : undefined) ||
                              (y.currentPoint === 50 ? "wrongShow": undefined)
                            }
                          >
                            {y.name} : {y.previousPoint} + {y.currentPoint}{" "}
                            points
                          </p>
                        )}
                        {/* {y.currentPoint === 0 && <p className="winner">winner: {y.name} </p>} */}
                      </>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}
