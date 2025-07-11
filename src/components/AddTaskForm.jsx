import { useState } from 'react';
import { PRIORITY } from '../constants/taskStatus';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiX, FiSave } from 'react-icons/fi';

export default function AddTaskForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(PRIORITY.MEDIUM);
  const [dueDate, setDueDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({
      title: title.trim(),
      priority,
      dueDate: dueDate?.toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Task Title*
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F34CF] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          placeholder="Enter task title"
          required
          autoFocus
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F34CF] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            {Object.entries(PRIORITY).map(([key, value]) => (
              <option key={value} value={value} className="bg-white dark:bg-gray-800">
                {key.toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Due Date
          </label>
          <DatePicker
            selected={dueDate}
            onChange={date => setDueDate(date)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F34CF] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            placeholderText="Select date"
            minDate={new Date()}
            popperClassName="dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700" // For dropdown calendar
            dayClassName={(date) => 
              'dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <FiX size={16} />
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-1 px-4 py-2 bg-[#6F34CF] text-white rounded-lg hover:bg-[#a266f7] focus:outline-none focus:ring-2 focus:ring-[#6F34CF] transition-colors"
        >
          <FiSave size={16} />
          Create Task
        </button>
      </div>
    </form>
  );
}