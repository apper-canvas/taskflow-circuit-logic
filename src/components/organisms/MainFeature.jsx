import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask } from '@/store/taskSlice';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import TaskModal from '@/components/organisms/TaskModal';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import TaskCard from '@/components/molecules/TaskCard';

const MainFeature = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const categories = useSelector((state) => state.categories.categories); // Needed for TaskModal

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [filterByStatus, setFilterByStatus] = useState('all');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (selectedCategory) {
      filtered = filtered.filter(task => task.categoryId === selectedCategory.id);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterByStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterByStatus);
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'priority') {
        const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });
  }, [tasks, selectedCategory, searchTerm, sortBy, filterByStatus]);

  const handleAddTask = (task) => {
    dispatch(addTask(task))
      .unwrap()
      .then(() => toast.success('Task added successfully!'))
      .catch((err) => toast.error(err.message || 'Failed to add task.'));
  };

  const handleUpdateTask = (task) => {
    dispatch(updateTask(task))
      .unwrap()
      .then(() => toast.success('Task updated successfully!'))
      .catch((err) => toast.error(err.message || 'Failed to update task.'));
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id))
        .unwrap()
        .then(() => toast.success('Task deleted successfully!'))
        .catch((err) => toast.error(err.message || 'Failed to delete task.'));
    }
  };

  const openModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  if (status === 'loading') return <div className="p-4 flex-1">Loading tasks...</div>;
  if (status === 'failed') return <div className="p-4 flex-1 text-red-500">Error: {error}</div>;

  return (
    <div className="flex-1 p-4 bg-white shadow-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {selectedCategory ? `${selectedCategory.name} Tasks` : 'All Tasks'}
      </h2>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow max-w-xs focus:ring-accent"
        />
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
          <select
            value={filterByStatus}
            onChange={(e) => setFilterByStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <Button
          onClick={() => openModal()}
          className="bg-accent text-white hover:bg-accent-dark flex items-center space-x-2"
        >
          <ApperIcon name="plus" className="w-4 h-4" />
          <span>Add New Task</span>
        </Button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openModal}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          initialData={editingTask}
          categories={categories}
          selectedCategory={selectedCategory}
        />
      )}
    </div>
  );
};

export default MainFeature;