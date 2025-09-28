  # Project Management Tool

A full-stack project management application built with React, TypeScript, Node.js, Express, and MongoDB. Users can create projects, manage tasks, and track progress through a clean web interface.

## Live Demo

Frontend: https://project-management-tool-dev.vercel.app/

## Features

### Core Functionality
- User registration and login with JWT authentication
- Create, edit, and delete projects
- Manage tasks within projects with status tracking
- Project and task filtering capabilities
- Responsive design for desktop and mobile

### Project Management
- Full CRUD operations for projects
- Project status tracking (Active/Completed)
- Project overview with task statistics
- Search functionality across projects

### Task Management
- Create and manage tasks within projects
- Task status workflow (To-Do, In Progress, Done)
- Due date tracking with priority indicators
- Quick status updates from project dashboard
- Task filtering by status

### User Experience
- Clean, modern interface with dark theme
- Form validation and error handling
- Loading states and user feedback
- Mobile-responsive navigation
- Toast notifications for user actions

## Tech Stack

### Frontend
- React 18 with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- React Hook Form with Yup validation
- Tailwind CSS for styling
- Vite for build tooling

### Backend
- Node.js with Express.js
- TypeScript for type safety
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- CORS configured for cross-origin requests

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/amiku3203/project-management-tool.git
   cd project-management-tool
   ```

2. Navigate to backend directory
   ```bash
   cd backend
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Environment Configuration
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/project-management
   JWT_SECRET=your-super-secret-jwt-key-here
   
   ```

5. Start the backend server
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

   The backend will run on http://localhost:5656

### Frontend Setup

1. Navigate to frontend directory
   ```bash
   cd frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Environment Configuration
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5656/api
   ```

4. Start the frontend development server
   ```bash
   npm run dev
   ```

   The frontend will run on http://localhost:5173

## Running Seeders

To populate your database with sample data:

1. Navigate to backend directory
   ```bash
   cd backend
   ```

2. Run the seeder script
   ```bash
   npm run seed
   ```

   This will create:
   - Sample user accounts
   - Demo projects with various statuses
   - Sample tasks with different priorities and due dates

3. Sample Login Credentials (after running seeders)
   ```
   Email: test@example.com
   Password:  Test@123
   ```

## Deployment

### Backend Deployment
The backend can be deployed on platforms like:
- Render: Connect your GitHub repo and deploy
- Railway: Simple deployment with MongoDB addon
- Heroku: Classic platform with MongoDB Atlas

### Frontend Deployment
The frontend is deployed on Vercel:
- Automatic deployments from GitHub
- Environment variables configured in Vercel dashboard
- Custom domain support

## Project Structure

```
project-management-tool/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API routes
│   │   ├── middlewares/     # Authentication & validation
│   │   ├── services/        # Business logic
│   │   ├── validations/     # Input validation schemas
│   │   ├── config/          # Database configuration
│   │   ├── seed/            # Database seeders
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # State management
│   │   ├── services/        # API calls
│   │   ├── types/           # TypeScript interfaces
│   │   ├── utils/           # Utility functions
│   │   └── validations/     # Form validation schemas
│   ├── public/              # Static assets
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Projects
- `GET /api/projects` - Get user projects (with pagination)
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/projects/:projectId/tasks` - Get project tasks
- `POST /api/projects/:projectId/tasks` - Create new task
- `GET /api/projects/:projectId/tasks/:taskId` - Get task details
- `PUT /api/projects/:projectId/tasks/:taskId` - Update task
- `DELETE /api/projects/:projectId/tasks/:taskId` - Delete task

## Known Limitations

1. Real-time Updates: No WebSocket implementation for real-time collaboration
2. File Attachments: No file upload functionality for tasks/projects
3. Team Collaboration: Single-user system, no team member invitations
4. Advanced Filtering: Limited filtering options (only by status)
5. Notifications: No email or push notification system
6. Time Tracking: No built-in time tracking for tasks
7. Comments: No commenting system for tasks or projects
8. Drag & Drop: No drag-and-drop interface for task management

## Future Enhancements

- Real-time collaboration with Socket.io
- Team member management and permissions
- File attachment support
- Advanced search and filtering
- Email notifications for due dates
- Time tracking and reporting
- Kanban board view
- Mobile application
- Integration with external tools (Slack, GitHub, etc.)

 