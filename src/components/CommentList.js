import React, { useState } from 'react';

const CommentList = ({ comments, onCommentUpdate, onCommentDelete, taskId }) => {
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleEdit = (comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  const handleCancel = () => {
    setEditingComment(null);
    setEditContent('');
  };

  const handleSave = async () => {
    if (!editContent.trim()) {
      alert('Please enter comment content');
      return;
    }

    try {
      await onCommentUpdate(editingComment, { content: editContent });
      setEditingComment(null);
      setEditContent('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDelete = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      onCommentDelete(commentId, taskId);
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
      <div className="comment-list">
        <div style={{ 
          textAlign: 'center', 
          color: '#7f8c8d', 
          fontStyle: 'italic',
          padding: '30px 20px',
          background: 'rgba(102, 126, 234, 0.05)',
          borderRadius: '12px',
          border: '2px dashed rgba(102, 126, 234, 0.2)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💬</div>
          <p style={{ margin: 0, fontSize: '1rem' }}>
            No comments yet. Be the first to add one!
          </p>
        </div>
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
                style={{
                  width: '100%',
                  height: '60px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '10px',
                  marginBottom: '10px',
                  resize: 'vertical'
                }}
              />
              <div className="comment-actions">
                <button onClick={handleSave} className="btn btn-success btn-small">
                  💾 Save
                </button>
                <button onClick={handleCancel} className="btn btn-small">
                  ❌ Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="comment-content">
                {comment.content}
              </div>
              <div className="comment-meta">
                <span>Posted: {formatDate(comment.created_at)}</span>
                <div className="comment-actions">
                  <button 
                    onClick={() => handleEdit(comment)} 
                    className="btn btn-small"
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
