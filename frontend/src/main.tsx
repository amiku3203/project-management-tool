import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}  
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          
          className: "rounded-lg shadow-lg font-semibold text-sm",
          duration: 5000,
          removeDelay: 500,
          style: {
            background: "#1E293B", 
            color: "#F8FAFC", 
            padding: "12px 16px", 
            border: "1px solid #334155", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
            fontFamily: "Inter, sans-serif", 
            minWidth: "250px",
            maxWidth: "400px",
          },

          
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#16A34A", 
              secondary: "#ECFDF5", 
            },
            style: {
              background: "#059669", 
              color: "#F0FDF4", 
            },
          },

          
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#DC2626", 
              secondary: "#FEE2E2", 
            },
            style: {
              background: "#B91C1C", 
              color: "#FEE2E2", 
            },
          },

        
        }}
      />
    </Provider>
  </BrowserRouter>
);
