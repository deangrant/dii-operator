import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/routes/app-routes";

/**
 * Wraps the routed application in the project-pages basename.
 */
export default function App() {
  return (
    <BrowserRouter basename="/dii-operator">
      <AppRoutes />
    </BrowserRouter>
  );
}
