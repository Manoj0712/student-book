import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global default options for all queries
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      retry: 1,                 // Retry failed requests once
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
