import requests
import json
import time

# Base URL for the API
BASE_URL = "http://localhost:5000"

def test_api_integration():
    """Integration test for the entire API"""
    print("🧪 Starting API Integration Tests...")
    
    # Test 1: Health Check
    print("\n1. Testing Health Check...")
    response = requests.get(f"{BASE_URL}/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data['status'] == 'healthy'
    print("✅ Health check passed")
    
    # Test 2: Create a task
    print("\n2. Creating a task...")
    task_data = {
        "title": "Integration Test Task",
        "description": "This is a test task for integration testing",
        "completed": False
    }
    response = requests.post(f"{BASE_URL}/api/tasks", json=task_data)
    assert response.status_code == 201
    task = response.json()
    task_id = task['id']
    print(f"✅ Task created with ID: {task_id}")
    
    # Test 3: Get all tasks
    print("\n3. Getting all tasks...")
    response = requests.get(f"{BASE_URL}/api/tasks")
    assert response.status_code == 200
    tasks = response.json()
    assert len(tasks) >= 1
    print(f"✅ Found {len(tasks)} task(s)")
    
    # Test 4: Get specific task
    print("\n4. Getting specific task...")
    response = requests.get(f"{BASE_URL}/api/tasks/{task_id}")
    assert response.status_code == 200
    retrieved_task = response.json()
    assert retrieved_task['title'] == task_data['title']
    print("✅ Task retrieved successfully")
    
    # Test 5: Update task
    print("\n5. Updating task...")
    update_data = {
        "title": "Updated Integration Test Task",
        "completed": True
    }
    response = requests.put(f"{BASE_URL}/api/tasks/{task_id}", json=update_data)
    assert response.status_code == 200
    updated_task = response.json()
    assert updated_task['title'] == update_data['title']
    assert updated_task['completed'] == True
    print("✅ Task updated successfully")
    
    # Test 6: Create a comment
    print("\n6. Creating a comment...")
    comment_data = {
        "content": "This is a test comment for the task",
        "task_id": task_id
    }
    response = requests.post(f"{BASE_URL}/api/comments", json=comment_data)
    assert response.status_code == 201
    comment = response.json()
    comment_id = comment['id']
    print(f"✅ Comment created with ID: {comment_id}")
    
    # Test 7: Get all comments
    print("\n7. Getting all comments...")
    response = requests.get(f"{BASE_URL}/api/comments")
    assert response.status_code == 200
    comments = response.json()
    assert len(comments) >= 1
    print(f"✅ Found {len(comments)} comment(s)")
    
    # Test 8: Get comments for specific task
    print("\n8. Getting comments for specific task...")
    response = requests.get(f"{BASE_URL}/api/tasks/{task_id}/comments")
    assert response.status_code == 200
    task_comments = response.json()
    assert len(task_comments) >= 1
    print(f"✅ Found {len(task_comments)} comment(s) for task")
    
    # Test 9: Update comment
    print("\n9. Updating comment...")
    comment_update_data = {
        "content": "This is an updated test comment"
    }
    response = requests.put(f"{BASE_URL}/api/comments/{comment_id}", json=comment_update_data)
    assert response.status_code == 200
    updated_comment = response.json()
    assert updated_comment['content'] == comment_update_data['content']
    print("✅ Comment updated successfully")
    
    # Test 10: Delete comment
    print("\n10. Deleting comment...")
    response = requests.delete(f"{BASE_URL}/api/comments/{comment_id}")
    assert response.status_code == 200
    print("✅ Comment deleted successfully")
    
    # Test 11: Delete task
    print("\n11. Deleting task...")
    response = requests.delete(f"{BASE_URL}/api/tasks/{task_id}")
    assert response.status_code == 200
    print("✅ Task deleted successfully")
    
    # Test 12: Verify task is deleted
    print("\n12. Verifying task is deleted...")
    response = requests.get(f"{BASE_URL}/api/tasks/{task_id}")
    assert response.status_code == 404
    print("✅ Task deletion verified")
    
    print("\n🎉 All integration tests passed!")

if __name__ == "__main__":
    print("Starting Flask app for integration testing...")
    print("Make sure the Flask app is running on http://localhost:5000")
    print("You can start it with: python app.py")
    print("\nWaiting 3 seconds before starting tests...")
    time.sleep(3)
    
    try:
        test_api_integration()
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to the API.")
        print("Make sure the Flask app is running on http://localhost:5000")
        print("Start it with: python app.py")
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        raise
