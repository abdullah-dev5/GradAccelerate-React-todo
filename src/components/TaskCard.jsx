import { useDrag } from 'react-dnd';
import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { PRIORITY } from '../constants/taskStatus';
import { format, isBefore } from 'date-fns';
import { FiEdit2, FiTrash2, FiMove } from 'react-icons/fi';

const priorityDots = {
  [PRIORITY.LOW]: 'bg-green-400 dark:bg-green-500',
  [PRIORITY.MEDIUM]: 'bg-yellow-400 dark:bg-yellow-500',
  [PRIORITY.HIGH]: 'bg-red-400 dark:bg-red-500'
};

export default function TaskCard({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const { updateTask, deleteTask } = useContext(TaskContext);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleSave = () => {
    const trimmedTitle = editedTitle.trim();
    if (trimmedTitle) {
      updateTask(task.id, { title: trimmedTitle });
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={drag}
      className={`relative group p-4 rounded-lg border ${
        isDragging 
          ? 'opacity-50' 
          : 'bg-white dark:bg-gray-700 shadow-xs hover:shadow-md dark:hover:shadow-gray-600/30'
      } transition-all cursor-grab active:cursor-grabbing border-gray-200 dark:border-gray-600`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#6F34CF] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-[#6F34CF] text-white rounded hover:bg-[#a266f7] transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <FiMove className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
            <div className="flex items-start gap-2 flex-1">
              <span className={`w-2 h-2 mt-1.5 rounded-full ${priorityDots[task.priority]}`}></span>
              <p className="text-gray-800 dark:text-gray-200">
                {task.title}
              </p>
            </div>
          </div>
          
          {task.dueDate && (
            <div className={`mt-2 text-xs ${
              isBefore(new Date(task.dueDate), new Date()) 
                ? 'text-red-500 dark:text-red-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </div>
          )}
          
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 dark:text-gray-500 hover:text-[#6F34CF] dark:hover:text-[#a266f7] p-1 transition-colors"
              aria-label="Edit task"
            >
              <FiEdit2 size={16} />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 p-1 transition-colors"
              aria-label="Delete task"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}