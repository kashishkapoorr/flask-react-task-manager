import React, { useState } from 'react';
import CommentSection from './CommentSection';

const TaskCard = ({ 
  task, 
  onTaskUpdate, 
  onTaskDelete, 
  onCommentCreate, 
  onCommentUpdate, 
  onCommentDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    completed: task.completed
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      title: task.title,
      description: task.description,
      completed: task.completed
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: task.title,
      description: task.description,
      completed: task.completed
    });
  };

  const handleSave = async () => {
    if (!editData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    try {
      await onTaskUpdate(task.id, editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      await onTaskUpdate(task.id, {
        ...task,
        completed: !task.completed
      });
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task? This will also delete all associated comments.')) {
      onTaskDelete(task.id);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="task-title-input"
            style={{
              fontSize: '18px',
              fontWeight: '600',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '5px 10px',
              width: '100%',
              marginRight: '10px'
            }}
          />
        ) : (
          <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
            {task.title}
          </h3>
        )}
        
        <div className="task-actions">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="btn btn-success btn-small">
                💾 Save
              </button>
              <button onClick={handleCancel} className="btn btn-small">
                ❌ Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={handleToggleComplete} className="btn btn-small">
                {task.completed ? '↩️ Undo' : '✅ Complete'}
              </button>
              <button onClick={handleEdit} className="btn btn-small">
                ✏️ Edit
              </button>
              <button onClick={handleDelete} className="btn btn-danger btn-small">
                🗑️ Delete
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <textarea
          name="description"
          value={editData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          style={{
            width: '100%',
            height: '80px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '10px',
            marginBottom: '15px',
            resize: 'vertical'
          }}
        />
      ) : (
        task.description && (
          <div className="task-description">
            {task.description}
          </div>
        )
      )}

      <div className="task-meta">
        <span>Created: {formatDate(task.created_at)}</span>
        <span>Updated: {formatDate(task.updated_at)}</span>
      </div>

      <CommentSection
        task={task}
        onCommentCreate={onCommentCreate}
        onCommentUpdate={onCommentUpdate}
        onCommentDelete={onCommentDelete}
      />
    </div>
  );
};

export default TaskCard;
