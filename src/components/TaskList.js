import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ 
  tasks, 
  onTaskUpdate, 
  onTaskDelete, 
  onCommentCreate, 
  onCommentUpdate, 
  onCommentDelete,
  loading 
}) => {
  if (loading) {
    return (
      <div className="loading">
        <p>🔄 Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>📝 No tasks yet</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
          onCommentCreate={onCommentCreate}
          onCommentUpdate={onCommentUpdate}
          onCommentDelete={onCommentDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
