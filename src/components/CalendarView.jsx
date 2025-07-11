import { useState, useContext } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  isSameMonth, 
  isSameDay, 
  isBefore,
  addMonths,
  subMonths
} from 'date-fns';
import { TaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function CalendarView() {
  const { getTasksByDate } = useContext(TaskContext);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          <FiChevronLeft size={20} className="text-gray-800 dark:text-gray-200" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button 
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          <FiChevronRight size={20} className="text-gray-800 dark:text-gray-200" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = 'EEE';
    const days = [];
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-1">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const tasksForDay = getTasksByDate(day);
        const isCurrentDay = isSameDay(day, new Date());
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isOverdue = isBefore(day, new Date()) && !isCurrentDay;

        days.push(
          <div
            className={`min-h-[100px] p-1 border ${
              !isCurrentMonth 
                ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700' 
                : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
            }`}
            key={day.toString()}
          >
            <div className={`text-right p-1 ${
              isCurrentDay 
                ? 'bg-[#6F34CF] text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto' 
                : ''
            } ${
              isOverdue 
                ? 'text-red-500 dark:text-red-400' 
                : isCurrentMonth 
                  ? 'text-gray-800 dark:text-gray-200' 
                  : 'text-gray-400 dark:text-gray-500'
            }`}>
              {formattedDate}
            </div>
            <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
              {tasksForDay.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  compact={true}
                />
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="">{rows}</div>;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700 p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}