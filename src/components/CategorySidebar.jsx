import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

function CategorySidebar({ categories, selectedCategory, onCategorySelect, tasks }) {
  const getTaskCount = (categoryId) => {
    if (categoryId === 'all') {
      return tasks.length;
    }
    return tasks.filter(task => task.category === categoryId).length;
  };

  const getCompletedCount = (categoryId) => {
    if (categoryId === 'all') {
      return tasks.filter(task => task.completed).length;
    }
    return tasks.filter(task => task.category === categoryId && task.completed).length;
  };

  const allCategories = [
    { id: 'all', name: 'All Tasks', color: '#5B69E5', icon: 'List' },
    ...categories
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-heading font-semibold text-gray-900 mb-4">Categories</h2>
        
        <div className="space-y-2">
          {allCategories.map((category) => {
            const taskCount = getTaskCount(category.id);
            const completedCount = getCompletedCount(category.id);
            const isSelected = selectedCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCategorySelect(category.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  isSelected 
                    ? 'bg-primary/10 border-2 border-primary/20' 
                    : 'hover:bg-gray-50 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className={`font-medium truncate ${
                      isSelected ? 'text-primary' : 'text-gray-900'
                    }`}>
                      {category.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className={`text-sm ${
                      isSelected ? 'text-primary' : 'text-gray-500'
                    }`}>
                      {completedCount}/{taskCount}
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                {taskCount > 0 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(completedCount / taskCount) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-1.5 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Today's Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Tasks</span>
              <span className="font-medium">{tasks.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Completed</span>
              <span className="font-medium text-success">{tasks.filter(t => t.completed).length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Remaining</span>
              <span className="font-medium text-accent">{tasks.filter(t => !t.completed).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategorySidebar;