import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginSchema } from "../../validations/authSchema";
import type { LoginFormData, User } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../../redux/slices/authSlice";
import axiosInstance from "../../utils/axios";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      dispatch(loginRequest());
      try {
        const response = await axiosInstance.post<{
          message: string;
          user: User;
          token: string;
        }>("/auth/login", data);

        const { user: userData, token } = response.data;
        console.log("Response", response.data);

        const updatedUser: User = { ...userData, token };
        dispatch(loginSuccess(updatedUser));
        toast.success("Login SuccessFully")
        const from = (location.state as any)?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      } catch (err: any) {
        console.error("Login error:", err);
        const errorMessage =
          err?.response?.data?.message || err?.message || "Login failed";
        dispatch(loginFailure(errorMessage));
        toast.error("Login SuccessFully")
      }
    },
    [dispatch, navigate, location]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 bg-[url('/assets/image.png')] bg-cover bg-center">
      <div className="bg-transparent border-2 border-white p-6 sm:p-8 rounded-lg shadow-2xl max-w-sm sm:max-w-md w-full mx-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
          Login to Manage Your Tasks
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6"
        >
          <div>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border-2 border-white rounded-md focus:outline-none focus:border-white-400  font-semibold bg-white text-gray-500 placeholder-gray-400"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 border-2 border-white rounded-md focus:outline-none focus:border-white-400 bg-white text-gray-500 placeholder-gray-400"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          {loading ? (
            <p className="text-center text-white-200">Loading...</p>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-white-600 border border-white-300 text-white font-semibold rounded-md hover:bg-white-700 focus:outline-none focus:ring-2 focus:ring-white-400 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          )}
        </form>

        <p className="mt-4 text-center text-sm sm:text-base text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white hover:underline font-medium">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
