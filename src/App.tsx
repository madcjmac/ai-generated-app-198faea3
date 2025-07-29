import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import FilterTabs from './components/FilterTabs';
import TaskStats from './components/TaskStats';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load tasks from localStorage on app start
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = (taskText, priority = 'medium') => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      priority: priority,
      createdAt: new Date().toISOString(),
      dueDate: null
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  // Toggle task completion
  const toggleTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Edit task
  const editTask = (taskId, newText, newPriority) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, text: newText, priority: newPriority }
          : task
      )
    );
  };

  // Set due date
  const setDueDate = (taskId, dueDate) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, dueDate: dueDate }
          : task
      )
    );
  };

  // Clear completed tasks
  const clearCompleted = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  // Filter tasks based on current filter and search term
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filter) {
      case 'active':
        return !task.completed && matchesSearch;
      case 'completed':
        return task.completed && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <AddTaskForm onAddTask={addTask} />
          </div>
          
          <div className="p-6">
            <TaskStats 
              total={totalTasks}
              completed={completedTasks}
              active={activeTasks}
            />
            
            <FilterTabs 
              filter={filter}
              setFilter={setFilter}
              onClearCompleted={clearCompleted}
              hasCompletedTasks={completedTasks > 0}
            />
            
            <TaskList
              tasks={filteredTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
              onSetDueDate={setDueDate}
              filter={filter}
              searchTerm={searchTerm}
            />
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            Built with React & Tailwind CSS • {totalTasks} total tasks
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;