import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-primary text-white p-4 rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
        <p className="text-sm text-gray-300 mb-2">{task.description}</p>
        <p className="text-xs mb-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        <p className="text-xs mb-1">
          Priority:{' '}
          <span
            className={`font-medium ${
              task.priority === 'high'
                ? 'text-red-300'
                : task.priority === 'medium'
                ? 'text-yellow-300'
                : 'text-green-300'
            }`}
          >
            {task.priority}
          </span>
        </p>
        <p className="text-xs">
          Status:{' '}
          <span
            className={`font-medium ${
              task.status === 'pending'
                ? 'text-yellow-300'
                : task.status === 'in-progress'
                ? 'text-blue-300'
                : 'text-green-300'
            }`}
          >
            {task.status}
          </span>
        </p>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button
          onClick={() => onEdit(task)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
          title="Edit Task"
        >
          <ApperIcon name="edit" className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 hover:bg-red-600 text-white"
          title="Delete Task"
        >
          <ApperIcon name="trash" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;