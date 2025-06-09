import React, { useState, useEffect } from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';

const TaskModal = ({ isOpen, onClose, onSubmit, initialData = {}, categories = [], selectedCategory }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    status: 'pending',
    categoryId: selectedCategory?.id || '',
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
        priority: initialData.priority || 'low',
        status: initialData.status || 'pending',
        categoryId: initialData.categoryId || selectedCategory?.id || '',
      });
    } else if (isOpen) {
      setFormData({ // Reset for new task
        title: '',
        description: '',
        dueDate: '',
        priority: 'low',
        status: 'pending',
        categoryId: selectedCategory?.id || '',
      });
    }
  }, [initialData, isOpen, selectedCategory]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...initialData, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <Button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 bg-transparent p-0"
        >
          <ApperIcon name="x" className="w-6 h-6" />
        </Button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {initialData.id ? 'Edit Task' : 'Add New Task'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <FormField label="Description" id="description" name="description">
            <textarea
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
            ></textarea>
          </FormField>
          <FormField
            label="Due Date"
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
          <FormField label="Priority" id="priority" name="priority">
            <select
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </FormField>
          <FormField label="Status" id="status" name="status">
            <select
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </FormField>
          {categories.length > 0 && (
            <FormField label="Category" id="categoryId" name="categoryId">
              <select
                value={formData.categoryId}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </FormField>
          )}
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-accent text-white hover:bg-accent-dark"
            >
              {initialData.id ? 'Save Changes' : 'Add Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;