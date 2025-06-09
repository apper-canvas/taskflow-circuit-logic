import { motion, AnimatePresence } from 'framer-motion';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import ApperIcon from './ApperIcon';

function MainFeature({ tasks, onCompleteTask, onEditTask, onDeleteTask, categories }) {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-16"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ApperIcon name="CheckCircle2" className="w-16 h-16 text-gray-300 mx-auto" />
        </motion.div>
        <h3 className="mt-4 text-lg font-heading font-medium text-gray-900">No tasks found</h3>
        <p className="mt-2 text-gray-500">Create your first task to get started with TaskFlow</p>
      </motion.div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error';
      case 'medium': return 'bg-accent';
      case 'low': return 'bg-success';
      default: return 'bg-gray-400';
    }
  };

  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || '#94a3b8';
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  const isDueDateOverdue = (dateString) => {
    if (!dateString) return false;
    return isPast(new Date(dateString)) && !isToday(new Date(dateString));
  };

  return (
    <div className="space-y-3 max-w-full">
      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 max-w-full overflow-hidden"
          >
            <div className="flex items-start space-x-4 min-w-0">
              {/* Checkbox */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onCompleteTask(task.id)}
                className={`relative w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 transition-all duration-300 ${
                  task.completed 
                    ? 'bg-success border-success' 
                    : 'border-gray-300 hover:border-primary'
                }`}
              >
                <AnimatePresence>
                  {task.completed && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <ApperIcon name="Check" className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Task Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between min-w-0">
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base font-medium break-words ${
                      task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h3>
                    
                    {/* Task Meta */}
                    <div className="flex items-center space-x-3 mt-2 flex-wrap">
                      {/* Category */}
                      {task.category && (
                        <span 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: getCategoryColor(task.category) }}
                        >
                          {categories.find(c => c.id === task.category)?.name || task.category}
                        </span>
                      )}

                      {/* Priority */}
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                        <span className="text-xs text-gray-500 capitalize">{task.priority}</span>
                      </div>

                      {/* Due Date */}
                      {task.dueDate && (
                        <span className={`text-xs ${
                          isDueDateOverdue(task.dueDate) 
                            ? 'text-error font-medium' 
                            : isToday(task.dueDate) 
                              ? 'text-accent font-medium'
                              : 'text-gray-500'
                        }`}>
                          {formatDueDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEditTask(task)}
                      className="p-1 text-gray-400 hover:text-primary transition-colors"
                    >
                      <ApperIcon name="Edit2" className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDeleteTask(task.id)}
                      className="p-1 text-gray-400 hover:text-error transition-colors"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default MainFeature;