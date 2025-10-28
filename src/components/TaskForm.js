import React, { useState } from 'react';

const TaskForm = ({ onSubmit, isCreating }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        completed: false
      });
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="task-form">
      <h2>✨ Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add some details about this task..."
          />
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
            Mark as completed
          </label>
        </div>
        
        <button 
          type="submit" 
          className="btn"
          disabled={isSubmitting || isCreating}
        >
          {isSubmitting || isCreating ? 'Creating...' : '✨ Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
