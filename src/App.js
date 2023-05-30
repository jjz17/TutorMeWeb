import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTicket from "./pages/CreateTicket";
import TutorView from "./pages/TutorView";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Chats from "./components/Chats";

function App() {
  const { currentUser, profile } = useContext(AuthContext);
  console.log("Profile data from AuthContext:", profile);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const TutorRoute = ({ children }) => {
    // TODO: Also check for tutor role
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const StudentRoute = ({ children }) => {
    // TODO: Also check for student role
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutors"
            element={
              <ProtectedRoute>
                <TutorView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chats"
            element={<ProtectedRoute>{/* <Chats /> */}</ProtectedRoute>}
          />
          <Route
            path="/create-ticket"
            element={
              <ProtectedRoute>
                <CreateTicket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/planner"
            element={<ProtectedRoute>{/* <Planner /> */}</ProtectedRoute>}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
