import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ScoreboardProps {
  tasks: string[];
  scores: number[];
}

const Scoreboard: React.FC<ScoreboardProps> = ({ tasks, scores }) => {
  const [sortedTasks, setSortedTasks] = useState<
    { task: string; score: number }[]
  >([]);

  useEffect(() => {
    // Combine tasks and scores into an array of objects
    const tasksWithScores = tasks.map((task, index) => ({
      task,
      score: scores[index],
    }));

    // Sort tasks by score from largest to smallest and update the state
    setSortedTasks(tasksWithScores.sort((a, b) => b.score - a.score));
  }, [tasks, scores]); // Re-run the effect when tasks or scores change

  // Find the highest score to normalize the loading bars
  const highestScore = Math.max(...scores);

  return (
    <div className="w-full bg-gray-200 p-4 rounded-lg">
      <h3 className="text-lg font-bold">Scoreboard:</h3>
      <ul className="list-disc list-inside mt-2">
        {sortedTasks.map(({ task, score }, index) => (
          <div key={index} className="bg-gray-400 mb-2 rounded-lg">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(score / highestScore) * 100}%` }}
              className="bg-green-500 rounded-lg p-2"
            >
              <span className="text-white">{task || "(Empty Task)"}</span>
            </motion.div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
