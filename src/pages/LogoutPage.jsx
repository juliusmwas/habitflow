// src/pages/LogoutPage.jsx
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./LogoutPage.css";

export default function LogoutPage() {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        navigate("/login"); // Redirect after logout
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        {/* Heading */}
        <h1 className="logout-title">Log Out</h1>
        <p className="logout-subtext">
          Are you sure you want to log out? You’ll need to log in again to
          access your habits and progress.
        </p>

        {/* Logout Button */}
        <button onClick={handleLogout} className="btn btn-logout">
          Yes, Log Me Out
        </button>

        {/* Cancel Button */}
        <button onClick={() => navigate("/dashboard")} className="btn btn-cancel">
          Cancel
        </button>

        {/* Footer Note */}
        <div className="logout-footer">
          <p>Stay consistent. Your progress matters 🚀</p>
        </div>
      </div>
    </div>
  );
}
