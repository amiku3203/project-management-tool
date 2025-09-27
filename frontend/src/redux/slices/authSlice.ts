import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../../types";

const getInitialState = (): AuthState => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const user = JSON.parse(userData);
        return {
          user: { ...user, token },
          loading: false,
          error: null,
        };
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    }
  }

  return {
    user: null,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);

        const { token, ...userData } = action.payload;
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state) => {
      state.loading = false;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout ,signupFailure,signupRequest,signupSuccess} =
  authSlice.actions;
export default authSlice.reducer;
