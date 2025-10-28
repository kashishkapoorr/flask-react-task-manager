import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreate = async (taskData) => {
    try {
      setIsCreating(true);
      const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
      setTasks([...tasks, response.data]);
      setSuccess('Task created successfully!');
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleTaskUpdate = async (taskId, updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, updatedData);
      setTasks(tasks.map(task => 
        task.id === taskId ? response.data : task
      ));
      setSuccess('Task updated successfully!');
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
      setSuccess('Task deleted successfully!');
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  const handleCommentCreate = async (taskId, commentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/comments`, {
        ...commentData,
        task_id: taskId
      });
      // Refresh tasks to get updated comments
      fetchTasks();
      setSuccess('Comment added successfully!');
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to add comment');
      console.error('Error adding comment:', err);
    }
  };

  const handleCommentUpdate = async (commentId, updatedData) => {
    try {
      await axios.put(`${API_BASE_URL}/comments/${commentId}`, updatedData);
      // Refresh tasks to get updated comments
      fetchTasks();
      setSuccess('Comment updated successfully!');
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update comment');
      console.error('Error updating comment:', err);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`${API_BASE_URL}/comments/${commentId}`);
      // Refresh tasks to get updated comments
      fetchTasks();
      setSuccess('Comment deleted successfully!');
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete comment');
      console.error('Error deleting comment:', err);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>✨ Task Manager</h1>
          <p>Organize your life with beautiful task management and collaborative comments</p>
        </header>

        {error && (
          <div className="error">
            <p>❌ {error}</p>
          </div>
        )}

        {success && (
          <div className="success">
            <p>✅ {success}</p>
          </div>
        )}

        <TaskForm 
          onTaskCreate={handleTaskCreate}
          isCreating={isCreating}
        />

        <TaskList
          tasks={tasks}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
          onCommentCreate={handleCommentCreate}
          onCommentUpdate={handleCommentUpdate}
          onCommentDelete={handleCommentDelete}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
