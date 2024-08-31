"use client";
import { useEffect, useState } from "react";
import Scoreboard from "@/components/Scoreboard";
import Game from "@/components/Game";
import TaskInput from "@/components/TaskInput";
import { Glicko2, Player } from "glicko2";

export default function Home() {
  const [ranking] = useState(
    new Glicko2({
      tau: 0.5,
      rating: 1500,
      rd: 200,
      vol: 0.06,
    })
  );
  const [tasks, setTasks] = useState<string[]>([""]);
  const [players, setPlayers] = useState<any[]>([]);
  const [inGame, setInGame] = useState<boolean>(false);
  const [taskPair, setTaskPair] = useState<number[]>([0, 1]);
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    const initialPlayer = ranking.makePlayer(1500, 200, 0.06);
    setTasks([""]);
    setPlayers([initialPlayer]);
  }, [ranking]);

  const addTask = () => {
    const newTask = "";
    const newPlayer = ranking.makePlayer(1500, 200, 0.06);

    setTasks([...tasks, newTask]);
    setPlayers([...players, newPlayer]);
  };

  const deleteTask = (index: number) => {
    const newTasks = [...tasks];
    const newPlayers = [...players];

    newTasks.splice(index, 1);
    newPlayers.splice(index, 1);

    setTasks(newTasks);
    setPlayers(newPlayers);
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTasks = [...tasks];
    newTasks[index] = event.target.value;
    setTasks(newTasks);
  };

  const startGame = () => {
    setInGame(true);
    setTaskPair(generateRandomPair(tasks.length));
  };

  const stopGame = () => {
    setInGame(false);
  };

  const generateRandomPair = (length: number): number[] => {
    const first = Math.floor(Math.random() * length);
    let second = Math.floor(Math.random() * length);
    while (second === first && length > 1) {
      second = Math.floor(Math.random() * length);
    }
    console.log(first, second);
    return [first, second];
  };

  const handleTaskClick = (winner: number, loser: number) => {
    const newMatch = [players[winner], players[loser], 1]; // Winner wins
    setMatches([...matches, newMatch]);
    console.log(matches);
    ranking.updateRatings([...matches, newMatch]);
    setTaskPair(generateRandomPair(tasks.length));
  };

  return (
    <main className="flex min-h-screen flex-col p-10">
      <h3 className="text-lg font-bold">What should I do right now?</h3>
      <div className="grid grid-rows-2 md:grid-cols-2 gap-4">
        {inGame ? (
          <Game
            tasks={tasks}
            taskPair={taskPair}
            handleTaskClick={handleTaskClick}
            stopGame={stopGame}
          />
        ) : (
          <TaskInput
            tasks={tasks}
            addTask={addTask}
            deleteTask={deleteTask}
            startGame={startGame}
            handleInputChange={handleInputChange}
          />
        )}
        <Scoreboard
          tasks={tasks}
          scores={players.map((player) => player.getRating())}
          matches={matches}
        />
      </div>
    </main>
  );
}
