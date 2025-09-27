  import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import { fetchProjects, setSearchQuery, deleteProject, createProject } from "../../redux/slices/projectSlice";
import type { Project, ProjectFormData } from "../../types";
import ProjectForm from "../../components/ProjectForm";

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { projects, loading, error, pagination, searchQuery } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery(localSearchQuery));
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, dispatch]);

  useEffect(() => {
    // Reset to page 1 when search query changes, or load initial data
    dispatch(fetchProjects({ page: 1, limit: 6, search: searchQuery }));
  }, [dispatch, searchQuery]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchProjects({ page, limit: 6, search: searchQuery }));
  };

  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setDeletingProjectId(projectId);
      try {
        await dispatch(deleteProject(projectId));
        
        // If we're on the last page and it only has 1 item, go to previous page
        const shouldGoToPreviousPage = 
          pagination.currentPage > 1 && 
          projects.length === 1 && 
          pagination.currentPage === pagination.totalPages;
        
        const targetPage = shouldGoToPreviousPage ? pagination.currentPage - 1 : pagination.currentPage;
        
        // Refresh the projects list
        dispatch(fetchProjects({ 
          page: targetPage, 
          limit: 6, 
          search: searchQuery 
        }));
      } finally {
        setDeletingProjectId(null);
      }
    }
  };

  const handleCreateProject = async (data: ProjectFormData) => {
    await dispatch(createProject(data));
    setShowCreateModal(false);
    // Refresh the projects list
    dispatch(fetchProjects({ page: 1, limit: 6, search: searchQuery }));
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-blue-100 text-blue-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[url('/assets/bg3.png')] bg-cover bg-center ">
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-white">
                Project Management Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header with search and create button */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Projects</h2>
              <p className="text-gray-950">Manage and track your projects</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={localSearchQuery}
                  onChange={handleSearch}
                  className="w-full sm:w-64 px-4 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Create Project
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}

          {/* Projects grid */}
          {!loading && (
            <>
              {projects.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-700 rounded-lg p-8  border-4 border-white">
                    <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                    <p className="text-gray-300 mb-4">
                      {searchQuery ? 'No projects match your search.' : 'Get started by creating your first project.'}
                    </p>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition duration-200"
                    >
                      Create Your First Project
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project: Project) => (
                    <div key={project._id} className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition duration-200 border-4 border-white">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-white truncate">{project.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>
                      
                      <div className="text-xs text-gray-400 mb-4">
                        Created: {formatDate(project.createdAt)}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => navigate(`/projects/${project._id}`)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition duration-200"
                        >
                          View Details
                        </button>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/projects/${project._id}/edit`)}
                            className="text-gray-300 hover:text-white transition duration-200"
                            disabled={deletingProjectId === project._id}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project._id)}
                            className="text-red-400 hover:text-red-300 transition duration-200 disabled:opacity-50"
                            disabled={deletingProjectId === project._id}
                          >
                            {deletingProjectId === project._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className="px-3 py-2 text-sm text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                    >
                      Previous
                    </button>
                    
                    {/* Show page numbers with ellipsis for large page counts */}
                    {(() => {
                      const { currentPage, totalPages } = pagination;
                      const pages = [];
                      const showEllipsis = totalPages > 7;
                      
                      if (!showEllipsis) {
                        // Show all pages if 7 or fewer
                        for (let i = 1; i <= totalPages; i++) {
                          pages.push(i);
                        }
                      } else {
                        // Show first page, current page area, and last page with ellipsis
                        if (currentPage <= 4) {
                          // Near the beginning
                          for (let i = 1; i <= 5; i++) pages.push(i);
                          pages.push('...');
                          pages.push(totalPages);
                        } else if (currentPage >= totalPages - 3) {
                          // Near the end
                          pages.push(1);
                          pages.push('...');
                          for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
                        } else {
                          // In the middle
                          pages.push(1);
                          pages.push('...');
                          for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                          pages.push('...');
                          pages.push(totalPages);
                        }
                      }
                      
                      return pages.map((page, index) => (
                        page === '...' ? (
                          <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-gray-400">
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page as number)}
                            className={`px-3 py-2 text-sm rounded-md transition duration-200 ${
                              page === currentPage
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      ));
                    })()}
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className="px-3 py-2 text-sm text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}

              {/* Projects count */}
              <div className="mt-4 text-center text-sm text-black">
                {pagination.totalProjects > 0 ? (
                  <>
                    Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to{' '}
                    {Math.min(pagination.currentPage * pagination.limit, pagination.totalProjects)} of{' '}
                    {pagination.totalProjects} projects
                    {searchQuery && (
                      <span className="ml-2 text-blue-400">
                        (filtered by "{searchQuery}")
                      </span>
                    )}
                  </>
                ) : (
                  searchQuery ? `No projects found for "${searchQuery}"` : 'No projects found'
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Create Project Modal */}
      {showCreateModal && (
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setShowCreateModal(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Dashboard;
