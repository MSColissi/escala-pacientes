import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <TooltipProvider>
        <AppRoutes />
        <Toaster />
      </TooltipProvider>
    </BrowserRouter>
  );
}