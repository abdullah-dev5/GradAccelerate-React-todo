import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TaskProvider } from "./context/TaskContext.jsx";

// React DnD
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Initialize dark mode before React renders
const initializeDarkMode = () => {
  try {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Apply dark mode if enabled in localStorage or system preference (when no preference saved)
      if (savedMode === 'true' || (savedMode === null && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
      }
    }
  } catch (error) {
    console.error("Dark mode initialization error:", error);
  }
};

// Call initialization before rendering
initializeDarkMode();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TaskProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </TaskProvider>
  </React.StrictMode>
);