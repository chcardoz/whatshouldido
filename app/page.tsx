"use client";
import { useEffect, useState } from "react";
import Scoreboard from "@/components/Scoreboard";
import Game from "@/components/Game";
import TaskInput from "@/components/TaskInput";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([""]); // State to manage task inputs
  const [scores, setScores] = useState<number[]>([]); // State to manage task scores
  const [inGame, setInGame] = useState<boolean>(false); // State to manage if game is started
  const [taskPair, setTaskPair] = useState<number[]>([0, 1]); // State to manage current task pair

  useEffect(() => {
    setTasks([""]);
    setScores([0]);
  }, []);

  const addTask = () => {
    setTasks([...tasks, ""]);
    setScores([...scores, 0]); // Initialize score for the new task
  };

  const deleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);

    const newScores = [...scores];
    newScores.splice(index, 1);
    setScores(newScores);
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

  const handleTaskClick = (winner: number) => {
    const newScores = [...scores];
    newScores[winner] += 1;
    setScores(newScores);
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
        <Scoreboard tasks={tasks} scores={scores} />
      </div>
    </main>
  );
}
