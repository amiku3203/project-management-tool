import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchProject } from "../../redux/slices/projectSlice";
import {
  fetchTasks,
  setFilter,
  deleteTask,
  createTask,
  updateTask,
} from "../../redux/slices/taskSlice";
import type { Task, TaskFormData } from "../../types";
import TaskForm from "../../components/TaskForm";
import toast from "react-hot-toast";

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { currentProject, loading: projectLoading } = useSelector(
    (state: RootState) => state.projects
  );
  const {
    tasks,
    loading: tasksLoading,
    filter,
  } = useSelector((state: RootState) => state.tasks);

  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));

      dispatch(fetchTasks({ projectId: id, status: undefined })).then(
        (result: any) => {
          if (result.payload) {
            setAllTasks(result.payload);
          }
        }
      );

      if (filter !== "all") {
        dispatch(fetchTasks({ projectId: id, status: filter }));
      }
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && filter !== "all") {
      dispatch(fetchTasks({ projectId: id, status: filter }));
    } else if (id && filter === "all") {
      dispatch(fetchTasks({ projectId: id, status: undefined }));
    }
  }, [dispatch, id, filter]);

  const handleFilterChange = (
    newFilter: "all" | "to-do" | "in-progress" | "done"
  ) => {
    dispatch(setFilter(newFilter));
  };

  const handleQuickStatusUpdate = async (
    taskId: string,
    newStatus: "to-do" | "in-progress" | "done"
  ) => {
    if (id) {
      try {
        console.log("Updating task status:", {
          taskId,
          newStatus,
          projectId: id,
        });
        const result = await dispatch(
          updateTask({
            projectId: id,
            taskId,
            taskData: { status: newStatus },
          })
        );

        dispatch(fetchTasks({ projectId: id, status: undefined })).then(
          (result: any) => {
            if (result.payload) {
              setAllTasks(result.payload);
            }
          }
        );

        dispatch(
          fetchTasks({
            projectId: id,
            status: filter === "all" ? undefined : filter,
          })
        );
      } catch (error) {
        toast.error("Failed to update task status");
      }
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (id && window.confirm("Are you sure you want to delete this task?")) {
      await dispatch(deleteTask({ projectId: id, taskId }));

      dispatch(fetchTasks({ projectId: id, status: undefined })).then(
        (result: any) => {
          if (result.payload) {
            setAllTasks(result.payload);
          }
        }
      );

      dispatch(
        fetchTasks({
          projectId: id,
          status: filter === "all" ? undefined : filter,
        })
      );
    }
  };

  const handleCreateTask = async (data: TaskFormData) => {
    if (id) {
      await dispatch(createTask({ projectId: id, taskData: data }));
      setShowCreateTaskModal(false);

      dispatch(fetchTasks({ projectId: id, status: undefined })).then(
        (result: any) => {
          if (result.payload) {
            setAllTasks(result.payload);
          }
        }
      );

      dispatch(
        fetchTasks({
          projectId: id,
          status: filter === "all" ? undefined : filter,
        })
      );
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "to-do":
        return "bg-gray-100 text-gray-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffDays = Math.ceil(
      (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return "text-red-500";
    if (diffDays <= 3) return "text-orange-500";
    return "text-gray-400";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTaskStats = () => {
    const total = allTasks.length;
    const todo = allTasks.filter((t) => t.status === "to-do").length;
    const inProgress = allTasks.filter(
      (t) => t.status === "in-progress"
    ).length;
    const done = allTasks.filter((t) => t.status === "done").length;

    return { total, todo, inProgress, done };
  };

  const stats = getTaskStats();

  if (projectLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Project not found
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[url('/assets/image.png')] bg-cover bg-center">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-300 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {currentProject.title}
                </h1>
                <p className="text-gray-300">{currentProject.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentProject.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {currentProject.status}
              </span>
              <button
                onClick={() => navigate(`/projects/${currentProject._id}/edit`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Edit Project
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Task Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-700 p-4 rounded-lg border-4 border-white">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-gray-300 text-sm">Total Tasks</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg  border-4 border-white">
              <div className="text-2xl font-bold text-gray-300">
                {stats.todo}
              </div>
              <div className="text-gray-300 text-sm">To Do</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg  border-4 border-white">
              <div className="text-2xl font-bold text-yellow-400">
                {stats.inProgress}
              </div>
              <div className="text-gray-300 text-sm">In Progress</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg  border-4 border-white">
              <div className="text-2xl font-bold text-green-400">
                {stats.done}
              </div>
              <div className="text-gray-300 text-sm">Completed</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex space-x-2">
              {(["all", "to-do", "in-progress", "done"] as const).map(
                (filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => handleFilterChange(filterOption)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
                      filter === filterOption
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {filterOption === "all"
                      ? "All Tasks"
                      : filterOption === "in-progress"
                      ? "In Progress"
                      : filterOption.charAt(0).toUpperCase() +
                        filterOption.slice(1)}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => setShowCreateTaskModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Add Task
            </button>
          </div>

          {tasksLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 ">
              <div className="bg-gray-700 rounded-lg p-8  border-4 border-white">
                <h3 className="text-xl font-semibold text-white mb-2">
                  No tasks found
                </h3>
                <p className="text-gray-300 mb-4">
                  {filter === "all"
                    ? "Get started by creating your first task."
                    : `No tasks with status "${filter}".`}
                </p>
                <button
                  onClick={() => setShowCreateTaskModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Create Task
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task: Task) => (
                <div
                  key={task._id}
                  className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition duration-200  border-4 border-white"
                >
                  <div className="flex justify-between items-start mb-4 ">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {task.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3">
                        {task.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">Status:</span>
                          <select
                            value={task.status}
                            onChange={(e) =>
                              handleQuickStatusUpdate(
                                task._id,
                                e.target.value as
                                  | "to-do"
                                  | "in-progress"
                                  | "done"
                              )
                            }
                            className="bg-gray-600 text-white text-xs px-2 py-1 rounded border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            disabled={tasksLoading}
                          >
                            <option value="to-do">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                          </select>
                        </div>
                        <span className={`${getPriorityColor(task.dueDate)}`}>
                          Due: {formatDate(task.dueDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() =>
                          navigate(
                            `/projects/${currentProject._id}/tasks/${task._id}/edit`
                          )
                        }
                        className="text-gray-300 hover:text-white transition duration-200"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-400 hover:text-red-300 transition duration-200"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Task Modal */}
      {showCreateTaskModal && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowCreateTaskModal(false)}
          loading={tasksLoading}
        />
      )}
    </div>
  );
};

export default ProjectDetails;
