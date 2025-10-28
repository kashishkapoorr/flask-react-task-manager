import pytest
import json
from app import app, db, Task, Comment

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.drop_all()
            db.create_all()
            yield client

class TestTaskAPI:
    def test_get_tasks_empty(self, client):
        """Test getting tasks when none exist"""
        response = client.get('/api/tasks')
        assert response.status_code == 200
        assert json.loads(response.data) == []
    
    def test_create_task_success(self, client):
        """Test creating a task successfully"""
        data = {
            'title': 'Test Task',
            'description': 'Test Description',
            'completed': False
        }
        response = client.post('/api/tasks', 
                             data=json.dumps(data),
                             content_type='application/json')
        assert response.status_code == 201
        response_data = json.loads(response.data)
        assert response_data['title'] == 'Test Task'
        assert response_data['description'] == 'Test Description'
        assert response_data['completed'] == False
        assert 'id' in response_data
    
    def test_create_task_missing_title(self, client):
        """Test creating a task without title"""
        data = {'description': 'Test Description'}
        response = client.post('/api/tasks',
                             data=json.dumps(data),
                             content_type='application/json')
        assert response.status_code == 400
        response_data = json.loads(response.data)
        assert 'error' in response_data
    
    def test_get_task_success(self, client):
        """Test getting a specific task"""
        # Create a task first
        task = Task(title='Test Task', description='Test Description')
        db.session.add(task)
        db.session.commit()
        
        response = client.get(f'/api/tasks/{task.id}')
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert response_data['title'] == 'Test Task'
    
    def test_get_task_not_found(self, client):
        """Test getting a non-existent task"""
        response = client.get('/api/tasks/999')
        assert response.status_code == 404
    
    def test_update_task_success(self, client):
        """Test updating a task"""
        # Create a task first
        task = Task(title='Original Title', description='Original Description')
        db.session.add(task)
        db.session.commit()
        
        data = {
            'title': 'Updated Title',
            'description': 'Updated Description',
            'completed': True
        }
        response = client.put(f'/api/tasks/{task.id}',
                            data=json.dumps(data),
                            content_type='application/json')
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert response_data['title'] == 'Updated Title'
        assert response_data['completed'] == True
    
    def test_delete_task_success(self, client):
        """Test deleting a task"""
        # Create a task first
        task = Task(title='Test Task', description='Test Description')
        db.session.add(task)
        db.session.commit()
        task_id = task.id
        
        response = client.delete(f'/api/tasks/{task_id}')
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert 'deleted successfully' in response_data['message']
        
        # Verify task is deleted
        response = client.get(f'/api/tasks/{task_id}')
        assert response.status_code == 404

class TestCommentAPI:
    def test_get_comments_empty(self, client):
        """Test getting comments when none exist"""
        response = client.get('/api/comments')
        assert response.status_code == 200
        assert json.loads(response.data) == []
    
    def test_create_comment_success(self, client):
        """Test creating a comment successfully"""
        # Create a task first
        task = Task(title='Test Task', description='Test Description')
        db.session.add(task)
        db.session.commit()
        
        data = {
            'content': 'Test Comment',
            'task_id': task.id
        }
        response = client.post('/api/comments',
                             data=json.dumps(data),
                             content_type='application/json')
        assert response.status_code == 201
        response_data = json.loads(response.data)
        assert response_data['content'] == 'Test Comment'
        assert response_data['task_id'] == task.id
        assert 'id' in response_data
    
    def test_create_comment_missing_content(self, client):
        """Test creating a comment without content"""
        data = {'task_id': 1}
        response = client.post('/api/comments',
                             data=json.dumps(data),
                             content_type='application/json')
        assert response.status_code == 400
        response_data = json.loads(response.data)
        assert 'error' in response_data
    
    def test_create_comment_invalid_task(self, client):
        """Test creating a comment for non-existent task"""
        data = {
            'content': 'Test Comment',
            'task_id': 999
        }
        response = client.post('/api/comments',
                             data=json.dumps(data),
                             content_type='application/json')
        assert response.status_code == 404
        response_data = json.loads(response.data)
        assert 'error' in response_data
    
    def test_get_comment_success(self, client):
        """Test getting a specific comment"""
        # Create a task and comment first
        task = Task(title='Test Task', description='Test Description')
        db.session.add(task)
        db.session.commit()
        
        comment = Comment(content='Test Comment', task_id=task.id)
        db.session.add(comment)
        db.session.commit()
        
        response = client.get(f'/api/comments/{comment.id}')
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert response_data['content'] == 'Test Comment'
    
    def test_get_comment_not_found(self, client):
        """Test getting a non-existent comment"""
        response = client.get('/api/comments/999')
        assert response.status_code == 404
    
    def test_update_comment_success(self, client):
        """Test updating a comment"""
        # Create a task and comment first
        task = Task(title='Test Task', description='Test Description')
        db.session.add(task)
        db.session.commit()
        
        comment = Comment(content='Original Comment', task_id=task.id)
        db.session.add(comment)
        db.session.commit()
        
        data = {'content': 'Updated Comment'}
        response = client.put(f'/api/comments/{comment.id}',
                            data=json.dumps(data),
                            content_type='application/json')
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert response_data['content'] == 'Updated Comment'
    
    def test_update_comment_missing_content(self, client):
        """Test updating a comment without content"""
        # Create a task and comment first
        task = Task(title='Test Task', description='Test Description')
        db.session.add(task)
        db.session.commit()
        
        comment = Comment(content='Original Comment', task_id=task.id)
        db.session.add(comment)
        db.session.commit()
        
        data = {}
        response = client.put(f'/api/comments/{comment.id}',
                            data=json.dumps(data),
                            content_type='application/json')
        assert response.status_code == 400
        response_data = json.loads(response.data)
        assert 'error' in response_data
    
    def test_delete_comment_success(self, client):
        """Test deleting a comment"""
        # Create a task and comment first
        task = Task(title='Test Task', description='Test Description')
        db.session.add(task)
        db.session.commit()
        
        comment = Comment(content='Test Comment', task_id=task.id)
        db.session.add(comment)
        db.session.commit()
        comment_id = comment.id
        
        response = client.delete(f'/api/comments/{comment_id}')
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert 'deleted successfully' in response_data['message']
        
        # Verify comment is deleted
        response = client.get(f'/api/comments/{comment_id}')
        assert response.status_code == 404
    
    def test_get_comments_for_task(self, client):
        """Test getting comments for a specific task"""
        # Create a task and comments first
        task = Task(title='Test Task', description='Test Description')
        db.session.add(task)
        db.session.commit()
        
        comment1 = Comment(content='Comment 1', task_id=task.id)
        comment2 = Comment(content='Comment 2', task_id=task.id)
        db.session.add(comment1)
        db.session.add(comment2)
        db.session.commit()
        
        response = client.get(f'/api/tasks/{task.id}/comments')
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert len(response_data) == 2

class TestHealthCheck:
    def test_health_check(self, client):
        """Test health check endpoint"""
        response = client.get('/api/health')
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert response_data['status'] == 'healthy'
