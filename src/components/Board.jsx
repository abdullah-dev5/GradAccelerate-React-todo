import { useContext, useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TaskContext } from '../context/TaskContext';
import Column from './Column';
import AddTaskForm from './AddTaskForm';
import CalendarView from './CalendarView';
import { STATUS, DATE_FILTERS } from '../constants/taskStatus';
import { FiCalendar, FiGrid } from 'react-icons/fi';

export default function Board() {
  const { tasks, addTask } = useContext(TaskContext);
  const [dateFilter, setDateFilter] = useState(DATE_FILTERS.TODAY);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [viewMode, setViewMode] = useState('board');

  const handleAddTask = useCallback((newTask) => {
    addTask({
      ...newTask,
      status: STATUS.TODO
    });
    setShowTaskForm(false);
  }, [addTask]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
        {/* Top Control Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Grad <span className="text-[#6F34CF]">Track</span>
          </h1>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowTaskForm(true)}
              className="flex items-center gap-1 px-4 py-2 bg-[#6F34CF] text-white rounded-lg hover:bg-[#a266f7] transition-colors shadow-md"
            >
              <span>+</span>
              <span>Add New Task</span>
            </button>
            
            <div className="relative inline-block">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-4 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6F34CF] focus:border-transparent shadow-sm appearance-none text-gray-800 dark:text-gray-200"
              >
                {Object.values(DATE_FILTERS).map(filter => (
                  <option 
                    key={filter} 
                    value={filter}
                    className="bg-white dark:bg-gray-800"
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-400">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <button
              onClick={() => setViewMode(viewMode === 'board' ? 'calendar' : 'board')}
              className="flex items-center gap-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors shadow-sm text-gray-800 dark:text-gray-200"
            >
              {viewMode === 'board' ? (
                <>
                  <FiCalendar size={16} />
                  <span>Calendar View</span>
                </>
              ) : (
                <>
                  <FiGrid size={16} />
                  <span>Board View</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Task Form Modal */}
        {showTaskForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl">
              <AddTaskForm 
                onSubmit={handleAddTask}
                onClose={() => setShowTaskForm(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        {viewMode === 'board' ? (
          <div className="flex gap-5 overflow-x-auto pb-4">
            {Object.values(STATUS).map((status) => (
              <Column
                key={status}
                status={status}
                tasks={tasks.filter(t => t.status === status)}
                dateFilter={dateFilter}
              />
            ))}
          </div>
        ) : (
          <CalendarView />
        )}
      </div>
    </DndProvider>
  );
}