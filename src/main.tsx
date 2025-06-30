import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarksContextProvider from "./contexts/BookmarksContextProvider";
import ActiveIdContextProvider from "./contexts/ActiveIdContextProvider";
import SearchTextContextProvider from "./contexts/SearchTextContextProvider";
import JobItemsContextProvider from "./contexts/JobItemsContextProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarksContextProvider>
        <ActiveIdContextProvider>
          <SearchTextContextProvider>
            <JobItemsContextProvider>
              <App />
            </JobItemsContextProvider>
          </SearchTextContextProvider>
        </ActiveIdContextProvider>
      </BookmarksContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
