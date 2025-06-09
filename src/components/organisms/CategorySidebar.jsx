import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, setSelectedCategory } from '@/store/categorySlice';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

const CategorySidebar = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory, status, error } = useSelector((state) => state.categories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      try {
        await dispatch(addCategory(newCategoryName)).unwrap();
        setNewCategoryName('');
        setShowAddInput(false);
        toast.success('Category added successfully!');
      } catch (err) {
        toast.error(err.message || 'Failed to add category.');
      }
    } else {
      toast.warn('Category name cannot be empty.');
    }
  };

  const handleSelectCategory = (category) => {
    dispatch(setSelectedCategory(category));
  };

  if (status === 'loading') return <div className="p-4">Loading categories...</div>;
  if (status === 'failed') return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full md:w-64 bg-secondary p-4 flex flex-col space-y-4 shadow-lg overflow-y-auto">
      <h2 className="text-lg font-semibold text-primary">Categories</h2>
      <div className="flex flex-col space-y-2 flex-grow">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => handleSelectCategory(category)}
            className={`text-left ${
              selectedCategory?.id === category.id
                ? 'bg-accent text-white'
                : 'bg-primary hover:bg-primary-dark text-white'
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div className="mt-4">
        {showAddInput ? (
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-grow focus:ring-accent"
              placeholder="New category name"
            />
            <Button
              onClick={handleAddCategory}
              className="bg-accent text-white hover:bg-accent-dark"
            >
              Add
            </Button>
            <Button
              onClick={() => setShowAddInput(false)}
              className="bg-gray-500 text-white hover:bg-gray-600"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setShowAddInput(true)}
            className="w-full bg-accent text-white hover:bg-accent-dark flex items-center justify-center space-x-2"
          >
            <ApperIcon name="plus" className="w-4 h-4" />
            <span>Add New Category</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CategorySidebar;