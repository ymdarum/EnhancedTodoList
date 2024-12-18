import React, { useState } from 'react';
import { User, Building2, Calendar, Star, MessageSquare } from 'lucide-react';

const TodoApp = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('work');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');
  const [filter, setFilter] = useState({
    priority: 'all',
    category: 'all',
    status: 'all'
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const addTodo = () => {
    if (todo.trim().length > 0) {
      setTodos([
        ...todos,
        {
          id: Math.random().toString(),
          value: todo,
          priority,
          category,
          dueDate: dueDate || null,
          assignee: assignee || null,
          status: 'not-started',
          isStarred: false,
        }
      ]);
      setTodo('');
      setDueDate('');
      setAssignee('');
    }
  };

  const calculateProgress = () => {
    if (todos.length === 0) return 0;
    const completed = todos.filter(todo => todo.status === 'completed').length;
    return Math.round((completed / todos.length) * 100);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-8">Enhanced Todo List</h1>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <p className="text-center text-gray-600">
          Overall Progress: {calculateProgress()}%
        </p>
      </div>

      {/* Add Todo Form */}
      <div className="space-y-4 mb-8">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter a new todo"
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="flex gap-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="home">Home</option>
          </select>
        </div>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          placeholder="dd/mm/yyyy"
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-4">
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Assign to...</option>
            <option value="alice">Alice</option>
            <option value="bob">Bob</option>
            <option value="charlie">Charlie</option>
          </select>

          <button 
            onClick={addTodo}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <select
          value={filter.priority}
          onChange={(e) => setFilter({...filter, priority: e.target.value})}
          className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={filter.category}
          onChange={(e) => setFilter({...filter, category: e.target.value})}
          className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="home">Home</option>
        </select>

        <select
          value={filter.status}
          onChange={(e) => setFilter({...filter, status: e.target.value})}
          className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Statuses</option>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Todo List */}
      <ul className="space-y-3">
        {todos.map((item) => (
          <li 
            key={item.id}
            className="p-4 bg-yellow-50 rounded-lg border border-yellow-100"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.category === 'personal' ? (
                    <User size={18} className="text-gray-600" />
                  ) : (
                    <Building2 size={18} className="text-gray-600" />
                  )}
                  <span className="font-medium">{item.value}</span>
                </div>
                <div className="flex items-center gap-4">
                  {item.dueDate && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar size={14} />
                      {formatDate(item.dueDate)}
                    </div>
                  )}
                  <span className="text-sm text-purple-600">{item.assignee}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <select
                    value={item.status}
                    onChange={(e) => {
                      const newTodos = todos.map(t => 
                        t.id === item.id ? {...t, status: e.target.value} : t
                      );
                      setTodos(newTodos);
                    }}
                    className="text-sm p-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    onClick={() => {
                      const newTodos = todos.map(t =>
                        t.id === item.id ? {...t, isStarred: !t.isStarred} : t
                      );
                      setTodos(newTodos);
                    }}
                    className="text-gray-400 hover:text-yellow-400"
                  >
                    <Star size={16} className={item.isStarred ? "fill-yellow-400 text-yellow-400" : ""} />
                  </button>
                  <button className="text-gray-400 hover:text-blue-500">
                    <MessageSquare size={16} />
                  </button>
                </div>
                <button 
                  onClick={() => setTodos(todos.filter(t => t.id !== item.id))}
                  className="px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;