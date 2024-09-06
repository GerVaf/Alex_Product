import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Path from "./routes/Path";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/ui/SideBar";
import CartIcon from "./components/ui/CartIcon";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" reverseOrder={false} />
      <CartIcon />
      <Sidebar />
      <Path />
    </QueryClientProvider>
  );
};

export default App;
