import React, { useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';
import { ClipboardList } from 'lucide-react';
import type { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    setTasks([
      ...tasks,
      {
        ...newTask,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      },
    ]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <ClipboardList className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Task Manager</h1>
          <p className="mt-2 text-gray-600">Manage your tasks efficiently</p>
        </div>

        <TaskForm onSubmit={addTask} />

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;