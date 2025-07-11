// src/App.jsx
import Board from './components/Board';
import { TaskProvider } from './context/TaskContext';
import DarkModeToggle from './components/DarkModeToggle';

export default function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Board />
        <DarkModeToggle />
      </div>
    </TaskProvider>
  );
}