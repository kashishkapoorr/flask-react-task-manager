import React, { useState } from 'react';
import CommentList from './CommentList';

const CommentSection = ({ 
  task, 
  onCommentCreate, 
  onCommentUpdate, 
  onCommentDelete 
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      alert('Please enter a comment');
      return;
    }

    setIsSubmitting(true);
    try {
      await onCommentCreate(task.id, { content: newComment });
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsSubmitting(false);
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
    <div className="comments-section">
      <div className="comments-header">
        <h4 className="comments-title">
          💬 Comments ({task.comments ? task.comments.length : 0})
        </h4>
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <div className="form-group">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts about this task..."
            rows="3"
            style={{
              width: '100%',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '10px',
              resize: 'vertical',
              marginBottom: '10px'
            }}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-small"
          disabled={isSubmitting || !newComment.trim()}
        >
          {isSubmitting ? 'Adding...' : '💬 Add Comment'}
        </button>
      </form>

      <CommentList
        comments={task.comments || []}
        onCommentUpdate={onCommentUpdate}
        onCommentDelete={onCommentDelete}
        taskId={task.id}
      />
    </div>
  );
};

export default CommentSection;
