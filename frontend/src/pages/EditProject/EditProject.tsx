   import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchProject, updateProject } from "../../redux/slices/projectSlice";
import type { ProjectFormData } from "../../types";
import ProjectForm from "../../components/ProjectForm";
import toast from "react-hot-toast";

const EditProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { currentProject, loading } = useSelector((state: RootState) => state.projects);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));
    }
  }, [dispatch, id]);

  const handleUpdateProject = async (data: ProjectFormData) => {
    if (id) {
      setIsSubmitting(true);
      try {
        await dispatch(updateProject({ id, projectData: data }));
        toast.success("Project updated successfully!");
        navigate(`/projects/${id}`);
      } catch (error: any) {
        console.error('Failed to update project:', error);
        toast.error("Failed to update project. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };
console.log("Curren ",currentProject);
  const handleCancel = () => {
    navigate(`/projects/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Project not found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Back to Dashboard
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
              <h1 className="text-2xl font-bold text-white">Edit Project</h1>
              <p className="text-gray-300">Update project details</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <ProjectForm
            initialData={{
              title: currentProject.title,
              description: currentProject.description,
             status: currentProject?.status === "active" ? "Active" : currentProject?.status === "completed" ? "Completed" : "Active",
            }}
            onSubmit={handleUpdateProject}
            onCancel={handleCancel}
            loading={isSubmitting}
            submitText="Update Project"
            isModal={false}
          />
        </div>
      </main>
    </div>
  );
};

export default EditProject;
