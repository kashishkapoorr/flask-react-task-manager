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

  const handleSave = () => {
    onTaskUpdate(task.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: task.title,
      description: task.description,
      completed: task.completed
    });
  };

  const handleToggleComplete = () => {
    onTaskUpdate(task.id, { completed: !task.completed });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onTaskDelete(task.id);
    }
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
          <div style={{ flex: 1, marginRight: '15px' }}>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({...editData, title: e.target.value})}
              className="form-group input"
              style={{ marginBottom: '10px' }}
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              className="form-group textarea"
              rows="3"
            />
          </div>
        ) : (
          <div style={{ flex: 1 }}>
            <h3 className="task-title">{task.title}</h3>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
          </div>
        )}
        
        <div className="task-actions">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                className="btn btn-secondary btn-small"
              >
                💾 Save
              </button>
              <button 
                onClick={handleCancel}
                className="btn btn-danger btn-small"
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleToggleComplete}
                className="btn btn-secondary btn-small"
              >
                {task.completed ? '↩️ Undo' : '✅ Complete'}
              </button>
              <button 
                onClick={handleEdit}
                className="btn btn-primary btn-small"
              >
                ✏️ Edit
              </button>
              <button 
                onClick={handleDelete}
                className="btn btn-danger btn-small"
              >
                🗑️ Delete
              </button>
            </>
          )}
        </div>
      </div>
      
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
