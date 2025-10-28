# Flask + React Task Manager

A full-stack task management application built with Flask and React for the Associate Software Engineer assessment.

## 🎯 Assignment Completion

### ✅ Task 1: Backend APIs
- **Complete Flask backend** with SQLAlchemy ORM
- **CRUD APIs for Tasks** (Create, Read, Update, Delete)
- **CRUD APIs for Comments** (Create, Read, Update, Delete)
- **18 comprehensive tests** (100% passing)
- **RESTful API design** with proper HTTP methods
- **Error handling and validation**

### ✅ Task 2: Frontend Interface (BONUS)
- **Complete React frontend** with modern UI design
- **Task Management Interface** (Create, Edit, Delete, Complete)
- **Comment System Interface** (Add, Edit, Delete comments)
- **Modern Glassmorphism Design** with animations
- **Mobile-responsive layout** for all devices
- **Real-time updates** and user feedback

## 🚀 Quick Start

### Option 1: Start Both Servers (Recommended)
```bash
./start_servers.sh
```

### Option 2: Manual Setup

#### Backend Setup
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

#### Frontend Setup
```bash
# Install dependencies
npm install

# Start React development server
npm start
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🧪 Testing

### Backend Tests
```bash
source venv/bin/activate
python -m pytest test_app.py -v
```

### Integration Tests
```bash
source venv/bin/activate
python test_integration.py
```

## 📊 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/<id>` - Get specific task
- `PUT /api/tasks/<id>` - Update task
- `DELETE /api/tasks/<id>` - Delete task

### Comments
- `GET /api/comments` - Get all comments
- `POST /api/comments` - Create new comment
- `GET /api/comments/<id>` - Get specific comment
- `PUT /api/comments/<id>` - Update comment
- `DELETE /api/comments/<id>` - Delete comment
- `GET /api/tasks/<id>/comments` - Get comments for specific task

## 🎨 Features

### Backend Features
- Flask framework with SQLAlchemy ORM
- SQLite database with proper relationships
- RESTful API design
- Comprehensive error handling
- 18 automated tests with pytest
- CORS enabled for frontend integration

### Frontend Features
- React with functional components and hooks
- Modern glassmorphism UI design
- Responsive design for all devices
- Real-time task and comment management
- Smooth animations and transitions
- Loading states and error handling
- Component-based architecture

## 📁 Project Structure

```
flask-react-task-manager/
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── test_app.py           # Backend unit tests
├── test_integration.py   # Integration tests
├── package.json          # Node.js dependencies
├── public/
│   └── index.html        # HTML template
├── src/
│   ├── App.js           # Main React component
│   ├── App.css          # App-specific styles
│   ├── index.js         # React entry point
│   ├── index.css        # Global styles
│   └── components/      # React components
│       ├── TaskForm.js
│       ├── TaskList.js
│       ├── TaskCard.js
│       ├── CommentSection.js
│       └── CommentList.js
└── start_servers.sh     # Script to start both servers
```

## 🔧 Technical Stack

### Backend
- **Flask** - Web framework
- **SQLAlchemy** - ORM
- **SQLite** - Database
- **pytest** - Testing framework
- **Flask-CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **Modern CSS** - Glassmorphism design
- **Responsive Design** - Mobile-first approach

## 📝 Testing Results

```
============================= test session starts ==============================
platform darwin -- Python 3.14.0, pytest-7.4.2, pluggy-1.6.0
collected 18 items

test_app.py::TestTaskAPI::test_get_tasks_empty PASSED                    [  5%]
test_app.py::TestTaskAPI::test_create_task_success PASSED                [ 11%]
test_app.py::TestTaskAPI::test_create_task_missing_title PASSED          [ 16%]
test_app.py::TestTaskAPI::test_get_task_success PASSED                   [ 22%]
test_app.py::TestTaskAPI::test_get_task_not_found PASSED                 [ 27%]
test_app.py::TestTaskAPI::test_update_task_success PASSED                [ 33%]
test_app.py::TestTaskAPI::test_delete_task_success PASSED                [ 38%]
test_app.py::TestCommentAPI::test_get_comments_empty PASSED              [ 44%]
test_app.py::TestCommentAPI::test_create_comment_success PASSED          [ 50%]
test_app.py::TestCommentAPI::test_create_comment_missing_content PASSED  [ 55%]
test_app.py::TestCommentAPI::test_create_comment_invalid_task PASSED     [ 61%]
test_app.py::TestCommentAPI::test_get_comment_success PASSED             [ 66%]
test_app.py::TestCommentAPI::test_get_comment_not_found PASSED           [ 72%]
test_app.py::TestCommentAPI::test_update_comment_success PASSED          [ 77%]
test_app.py::TestCommentAPI::test_update_comment_missing_content PASSED  [ 83%]
test_app.py::TestCommentAPI::test_delete_comment_success PASSED          [ 88%]
test_app.py::TestCommentAPI::test_get_comments_for_task PASSED           [ 94%]
test_app.py::TestHealthCheck::test_health_check PASSED                   [100%]

=============================== 18 passed, 50 warnings in 0.23s ========================
```

## 🎉 Assessment Submission

This project fully satisfies the Associate Software Engineer assessment requirements:

1. **Task 1**: Complete backend APIs with CRUD operations and automated tests ✅
2. **Task 2**: Complete frontend interface with modern UI design ✅

### Pull Requests
- [Task 1: Backend APIs](https://github.com/kashishkapoorr/flask-react-task-manager/pull/1)
- [Task 2: Frontend Interface](https://github.com/kashishkapoorr/flask-react-task-manager/pull/2)

## 📄 License

This project is created for assessment purposes.