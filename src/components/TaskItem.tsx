import React, { useState } from 'react';
import { Pencil, Trash2, Check, X, Save } from 'lucide-react';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(task.id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={3}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => onUpdate(task.id, { completed: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div>
                <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                <p className="mt-1 text-gray-500">{task.description}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="inline-flex items-center p-2 border border-gray-300 rounded-md text-red-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </>
      )}
    </div>
  );
}