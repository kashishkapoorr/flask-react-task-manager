import React, { useState } from 'react';

const TaskForm = ({ onTaskCreate, isCreating }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onTaskCreate(formData);
      setFormData({
        title: '',
        description: '',
        completed: false
      });
    }
  };

  return (
    <div className="task-form">
      <h2>✨ Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title..."
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
            placeholder="Enter task description..."
            rows="3"
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
          className="btn btn-primary"
          disabled={isCreating}
        >
          {isCreating ? 'Creating...' : '✨ Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
