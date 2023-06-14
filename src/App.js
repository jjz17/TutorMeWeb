import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTicket from "./pages/CreateTicket";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Chats from "./components/Chats";
import InProgressPage from "./pages/InProgressPage";

function App() {
  const { currentUser, profile, loading } = useContext(AuthContext);
  // useEffect(() => {
  //   if (loading) {
  //     console.log("loading...");
  //     return <span></span>
  //   }
  //   else {
  //     return
  //   }
  // }, [profile, loading]);
  // console.log("Profile data from AuthContext:", profile);
  console.log("Role from AuthContext is:", profile && profile.role);

  const ProtectedRoute = ({ children }) => {
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
            path="/chats"
            // element={<ProtectedRoute>{/* <Chats /> */}</ProtectedRoute>}
            element={<ProtectedRoute>{<InProgressPage />}</ProtectedRoute>}
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
            // element={<ProtectedRoute>{/* <Planner /> */}</ProtectedRoute>}
            element={<ProtectedRoute>{<InProgressPage />}</ProtectedRoute>}
          />
          <Route
            path="/search"
            element={<ProtectedRoute>{<InProgressPage />}</ProtectedRoute>}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
