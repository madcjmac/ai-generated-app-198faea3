import React from 'react';
import TaskItem from './TaskItem';
import { CheckCircle2, ListTodo, Search } from 'lucide-react';

const TaskList = ({ 
  tasks, 
  onToggleTask, 
  onDeleteTask, 
  onEditTask, 
  onSetDueDate,
  filter,
  searchTerm 
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
          {searchTerm ? (
            <Search className="w-full h-full" />
          ) : filter === 'completed' ? (
            <CheckCircle2 className="w-full h-full" />
          ) : (
            <ListTodo className="w-full h-full" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          {searchTerm 
            ? 'No tasks found' 
            : filter === 'completed' 
            ? 'No completed tasks yet' 
            : filter === 'active'
            ? 'No active tasks'
            : 'No tasks yet'
          }
        </h3>
        <p className="text-gray-500">
          {searchTerm 
            ? `No tasks match "${searchTerm}"`
            : filter === 'completed'
            ? 'Complete some tasks to see them here'
            : 'Add a task above to get started'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {filter === 'all' && 'All Tasks'}
          {filter === 'active' && 'Active Tasks'}
          {filter === 'completed' && 'Completed Tasks'}
          {searchTerm && ` matching "${searchTerm}"`}
        </h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>
      
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => onToggleTask(task.id)}
            onDelete={() => onDeleteTask(task.id)}
            onEdit={onEditTask}
            onSetDueDate={onSetDueDate}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;