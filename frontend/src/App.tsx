import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import Login from "./pages/auth/login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import EditProject from "./pages/EditProject/EditProject";
import EditTask from "./pages/EditTask/EditTask";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/auth/signup";

const App = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id/edit"
        element={
          <ProtectedRoute>
            <EditProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:projectId/tasks/:taskId/edit"
        element={
          <ProtectedRoute>
            <EditTask />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
