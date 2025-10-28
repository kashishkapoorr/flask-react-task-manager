import React, { useState } from 'react';
import CommentList from './CommentList';

const CommentSection = ({ task, onCommentCreate, onCommentUpdate, onCommentDelete }) => {
  const [newComment, setNewComment] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setIsAddingComment(true);
      await onCommentCreate(task.id, { content: newComment.trim() });
      setNewComment('');
      setIsAddingComment(false);
    }
  };

  // Get comments for this task (assuming comments are stored in task object)
  const comments = task.comments || [];

  return (
    <div className="comment-section">
      <div className="comment-header">
        <h3>💬 Comments</h3>
        <span className="comment-count">{comments.length} comment{comments.length !== 1 ? 's' : ''}</span>
      </div>
      
      <form onSubmit={handleAddComment} className="comment-form">
        <div className="form-group">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows="3"
            disabled={isAddingComment}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary btn-small"
          disabled={isAddingComment || !newComment.trim()}
        >
          {isAddingComment ? 'Adding...' : '💬 Add Comment'}
        </button>
      </form>
      
      <CommentList
        comments={comments}
        onCommentUpdate={onCommentUpdate}
        onCommentDelete={onCommentDelete}
      />
    </div>
  );
};

export default CommentSection;
