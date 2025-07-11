import { useDrop } from 'react-dnd';
import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';
import { STATUS } from '../constants/taskStatus';
import { isToday, isThisWeek, isThisMonth, isBefore } from 'date-fns';
import { FiCircle, FiClock, FiCheckCircle } from 'react-icons/fi';

const statusIcons = {
  [STATUS.TODO]: <FiCircle className="text-[#6F34CF] dark:text-[#a266f7]" size={16} />,
  [STATUS.IN_PROGRESS]: <FiClock className="text-[#a266f7] dark:text-[#b88cff]" size={16} />,
  [STATUS.DONE]: <FiCheckCircle className="text-gray-400 dark:text-gray-500" size={16} />
};

const ColumnHeader = ({ status, count }) => {
  const statusLabels = {
    [STATUS.TODO]: 'To Do',
    [STATUS.IN_PROGRESS]: 'In Progress',
    [STATUS.DONE]: 'Done'
  };

  return (
    <div className="flex justify-between items-center mb-3 sticky top-0 bg-white dark:bg-gray-800 p-3 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2">
        {statusIcons[status]}
        <h2 className="font-medium text-gray-800 dark:text-gray-200">
          {statusLabels[status]}
        </h2>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
        {count}
      </span>
    </div>
  );
};

export default function Column({ status, tasks, dateFilter }) {
  const { moveTask } = useContext(TaskContext);
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const filteredTasks = tasks.filter(task => {
    if (!task.dueDate) return true;
    const dueDate = new Date(task.dueDate);
    switch (dateFilter) {
      case 'today': return isToday(dueDate);
      case 'week': return isThisWeek(dueDate);
      case 'month': return isThisMonth(dueDate);
      case 'overdue': return isBefore(dueDate, new Date());
      default: return true;
    }
  });

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[300px] flex flex-col rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${
        isOver 
          ? 'border-[#a266f7] bg-[#f5eeff] dark:bg-[#2a1b45]' 
          : 'bg-white dark:bg-gray-800'
      } transition-colors duration-150 h-fit max-h-[80vh] overflow-hidden`}
    >
      <ColumnHeader status={status} count={filteredTasks.length} />
      
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <p className="text-gray-400 dark:text-gray-500 text-center py-4">
            No tasks here
          </p>
        )}
      </div>
    </div>
  );
}