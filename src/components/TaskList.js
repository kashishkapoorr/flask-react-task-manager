import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ 
  tasks, 
  onTaskUpdate, 
  onTaskDelete, 
  onCommentCreate, 
  onCommentUpdate, 
  onCommentDelete 
}) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <h2>📋 Your Tasks</h2>
        <div className="task-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📝</div>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '1.5rem' }}>
            No tasks yet!
          </h3>
          <p style={{ color: '#7f8c8d', fontSize: '1.1rem', marginBottom: '20px' }}>
            Create your first task above to get started organizing your life.
          </p>
          <div style={{ fontSize: '2rem' }}>✨</div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Tasks ({tasks.length})</h2>
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
