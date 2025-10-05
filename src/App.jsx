import Navbar from "./components/NavBar.jsx";
import AppRoutes from "./routes.jsx";
import InitializeAuth from "./pages/Auth/InitializeAuth.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <InitializeAuth />
    </>
  );
}
