import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const WebPlayer = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </BrowserRouter>
  )
}
