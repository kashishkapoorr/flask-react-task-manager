import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks. Please make sure the backend server is running.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreate = async (taskData) => {
    try {
      setIsCreating(true);
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
      setTasks([...tasks, response.data]);
      setSuccess('🎉 Task created successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('❌ Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleTaskUpdate = async (taskId, taskData) => {
    try {
      setError(null);
      const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, taskData);
      setTasks(tasks.map(task => task.id === taskId ? response.data : task));
      setSuccess('Task updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      setError(null);
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
      setSuccess('Task deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const handleCommentCreate = async (taskId, commentData) => {
    try {
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/tasks/${taskId}/comments`, commentData);
      // Refresh the specific task to get updated comments
      const taskResponse = await axios.get(`${API_BASE_URL}/tasks/${taskId}`);
      setTasks(tasks.map(task => task.id === taskId ? taskResponse.data : task));
      setSuccess('Comment added successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to add comment. Please try again.');
      console.error('Error creating comment:', err);
    }
  };

  const handleCommentUpdate = async (commentId, commentData) => {
    try {
      setError(null);
      await axios.put(`${API_BASE_URL}/comments/${commentId}`, commentData);
      // Refresh all tasks to get updated comments
      fetchTasks();
      setSuccess('Comment updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update comment. Please try again.');
      console.error('Error updating comment:', err);
    }
  };

  const handleCommentDelete = async (commentId, taskId) => {
    try {
      setError(null);
      await axios.delete(`${API_BASE_URL}/comments/${commentId}`);
      // Refresh the specific task to get updated comments
      const taskResponse = await axios.get(`${API_BASE_URL}/tasks/${taskId}`);
      setTasks(tasks.map(task => task.id === taskId ? taskResponse.data : task));
      setSuccess('Comment deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete comment. Please try again.');
      console.error('Error deleting comment:', err);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>✨ Task Manager</h1>
        <p>Organize your life with beautiful task management and collaborative comments</p>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <TaskForm onSubmit={handleTaskCreate} isCreating={isCreating} />

      <TaskList
        tasks={tasks}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
        onCommentCreate={handleCommentCreate}
        onCommentUpdate={handleCommentUpdate}
        onCommentDelete={handleCommentDelete}
      />
    </div>
  );
}

export default App;
