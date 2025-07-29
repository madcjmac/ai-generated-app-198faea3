import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';

const AddTaskForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim(), priority);
      setTaskText('');
      setPriority('medium');
      setIsExpanded(false);
    }
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 border-0 rounded-xl bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:bg-white text-gray-800"
        />
        <button
          type="submit"
          disabled={!taskText.trim()}
          className="px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-gray-50 focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>
      
      {isExpanded && (
        <div className="flex items-center gap-4 animate-fade-in">
          <div className="flex items-center gap-2 text-white/90">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Priority:</span>
          </div>
          <div className="flex gap-2">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setPriority(level)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  priority === level 
                    ? priorityColors[level] 
                    : 'bg-white/20 text-white/70 border-white/30 hover:bg-white/30'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </form>
  );
};

export default AddTaskForm;