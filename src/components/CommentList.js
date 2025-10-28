import React, { useState } from 'react';

const CommentList = ({ comments, onCommentUpdate, onCommentDelete }) => {
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleEdit = (comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  const handleSave = async () => {
    if (editContent.trim()) {
      await onCommentUpdate(editingComment, { content: editContent.trim() });
      setEditingComment(null);
      setEditContent('');
    }
  };

  const handleCancel = () => {
    setEditingComment(null);
    setEditContent('');
  };

  const handleDelete = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      onCommentDelete(commentId);
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

  if (comments.length === 0) {
    return (
      <div className="empty-state">
        <p>No comments yet. Be the first to comment! 💭</p>
      </div>
    );
  }

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <div key={comment.id} className="comment-item">
          {editingComment === comment.id ? (
            <div>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="form-group textarea"
                rows="3"
                style={{ marginBottom: '10px' }}
              />
              <div className="comment-actions">
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
              </div>
            </div>
          ) : (
            <div>
              <div className="comment-content">{comment.content}</div>
              <div className="comment-meta">
                <span>{formatDate(comment.created_at)}</span>
                <div className="comment-actions">
                  <button 
                    onClick={() => handleEdit(comment)}
                    className="btn btn-primary btn-small"
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(comment.id)}
                    className="btn btn-danger btn-small"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
