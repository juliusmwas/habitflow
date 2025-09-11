import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Footer from "./Footer";
import Auth from "./Auth";
import Dashboard from "./Dashboard"; 
import { useAuth } from "./context/AuthContext";


// ProtectedRoute component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/auth"
          element={
            <>
              <Navbar />
              <Auth />
            </>
          }
        />

        {/* Private route (different layout, no public navbar) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard /> {/* Dashboard has its own layout/navbar */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
