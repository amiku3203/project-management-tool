   import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchProject } from "../../redux/slices/projectSlice";
import { updateTask } from "../../redux/slices/taskSlice";
 
import type { TaskFormData, Task } from "../../types";
import TaskForm from "../../components/TaskForm";
import { taskService } from "../../services/taskServices";
import toast from "react-hot-toast";

const EditTask: React.FC = () => {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { currentProject, loading: projectLoading } = useSelector((state: RootState) => state.projects);
  const { loading: taskLoading } = useSelector((state: RootState) => state.tasks);
  
  const [task, setTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingTask, setIsLoadingTask] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (projectId && taskId) {
        // Load project
        dispatch(fetchProject(projectId));
        
        // Load task
        try {
          const taskData = await taskService.getTask(projectId, taskId);
          setTask(taskData);
        } catch (error) {
          console.error('Failed to load task:', error);
        } finally {
          setIsLoadingTask(false);
        }
      }
    };

    loadData();
  }, [dispatch, projectId, taskId]);

  const handleUpdateTask = async (data: TaskFormData) => {
    if (projectId && taskId) {
      setIsSubmitting(true);
      try {
        await dispatch(updateTask({ projectId, taskId, taskData: data }));
        toast.success("Task updated successfully!");
        navigate(`/projects/${projectId}`);
      } catch (error: any) {
        console.error('Failed to update task:', error);
        toast.error("Failed to update task. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    navigate(`/projects/${projectId}`);
  };

  if (projectLoading || isLoadingTask) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading task...</p>
        </div>
      </div>
    );
  }

  if (!currentProject || !task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Task not found</h2>
          <button
            onClick={() => navigate(`/projects/${projectId}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Back to Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCancel}
              className="text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Edit Task</h1>
              <p className="text-gray-300">Update task in {currentProject.title}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <TaskForm
            initialData={{
              title: task.title,
              description: task.description,
              status: task.status,
              dueDate: task.dueDate,
            }}
            onSubmit={handleUpdateTask}
            onCancel={handleCancel}
            loading={isSubmitting}
            submitText="Update Task"
            isModal={false}
          />
        </div>
      </main>
    </div>
  );
};

export default EditTask;
