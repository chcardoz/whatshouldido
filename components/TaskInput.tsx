import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface TaskInputProps {
  handleInputChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  deleteTask: (index: number) => void;
  addTask: () => void;
  startGame: () => void;
  tasks: string[];
}

const TaskInput: React.FC<TaskInputProps> = ({
  tasks,
  handleInputChange,
  deleteTask,
  addTask,
  startGame,
}) => {
  return (
    <div className="w-full bg-gray-200 p-4 rounded-lg">
      <h3 className="text-md">Tasks:</h3>
      {tasks.map((task, index) => (
        <div
          key={index}
          className="flex flex-row gap-2 justify-center items-center mb-2 w-full"
        >
          <Input
            value={task}
            onChange={(event) => handleInputChange(index, event)}
            className=""
          />
          <button
            onClick={() => deleteTask(index)}
            className="bg-red-500 text-white p-2 rounded"
          >
            <X />
          </button>
        </div>
      ))}
      <div className="flex flex-row gap-2 justify-center items-center mb-2 w-full">
        <button
          onClick={addTask}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button>
        <button
          onClick={startGame}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
