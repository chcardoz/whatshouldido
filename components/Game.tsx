interface GameProps {
  stopGame: () => void;
  handleTaskClick: (winner: number) => void;
  tasks: string[];
  taskPair: number[];
}

const Game: React.FC<GameProps> = ({
  stopGame,
  handleTaskClick,
  tasks,
  taskPair,
}) => {
  return (
    <div className="w-full bg-gray-200 p-4 rounded-lg">
      <h3 className="text-lg font-bold">Choose a Task:</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleTaskClick(taskPair[0])}
          className="bg-green-500 text-white p-2 rounded"
        >
          {tasks[taskPair[0]] || "(Empty Task)"}
        </button>
        <button
          onClick={() => handleTaskClick(taskPair[1])}
          className="bg-green-500 text-white p-2 rounded"
        >
          {tasks[taskPair[1]] || "(Empty Task)"}
        </button>
      </div>
      <button
        onClick={stopGame}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Stop Game
      </button>
    </div>
  );
};

export default Game;
