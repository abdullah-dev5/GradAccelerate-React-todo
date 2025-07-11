// src/context/TaskContext.jsx
import { createContext, useState, useCallback, useEffect } from 'react';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: 'Example Task',
        status: 'todo',
        priority: 'medium',
        dueDate: null,
        createdAt: new Date().toISOString()
      }
    ];
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((newTask) => {
    setTasks(prev => [...prev, {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }]);
  }, []);

  const moveTask = useCallback((id, newStatus) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  }, []);

  const updateTask = useCallback((id, updates) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, ...updates } : task
    ));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const getTasksByStatus = useCallback((status) => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  const getTasksByDate = useCallback((date) => {
    return tasks.filter(task => 
      task.dueDate && 
      new Date(task.dueDate).toDateString() === date.toDateString()
    );
  }, [tasks]);

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      moveTask,
      updateTask,
      deleteTask,
      getTasksByStatus,
      getTasksByDate
    }}>
      {children}
    </TaskContext.Provider>
  );
}