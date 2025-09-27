  import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { ProjectFormData } from "../types";

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  loading?: boolean;
  submitText?: string;
  isModal?: boolean;
}

const projectSchema = yup.object({
  title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
  description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
  status: yup.string().oneOf(['Active', 'Completed']).required("Status is required"),
});

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  submitText = "Create Project",
  isModal = true
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      status: initialData?.status || "Active",
    },
  });

  const formContent = (
    <div className={`${isModal ? 'bg-gray-800' : 'bg-gray-700'} rounded-lg p-6 w-full ${isModal ? 'max-w-md' : 'max-w-2xl'}`}>
      <h3 className="text-lg font-semibold text-white mb-6">
        {initialData ? "Edit Project" : "Create New Project"}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="w-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-400">{errors.status.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-300 bg-gray-600 hover:bg-gray-700 rounded-md text-sm font-medium transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : submitText}
            </button>
          </div>
      </form>
    </div>
  );

  return isModal ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {formContent}
    </div>
  ) : (
    formContent
  );
};

export default ProjectForm;
