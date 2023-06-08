import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTicket from "./pages/CreateTicket";
import TutorView from "./pages/TutorView";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Chats from "./components/Chats";

function App() {
  const { currentUser, profile } = useContext(AuthContext);
  // console.log("Profile data from AuthContext:", profile);
  console.log("Role from AuthContext is:", profile && profile.role);

  // const [profile] = useState(false);

  // useEffect(() => {

  // })
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const ProtectedTutorRoute = ({ children }) => {
    // guests are redirected to login
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    // students are redirected to their dashboard
    // if (profile != "tutor") {
    //   return <Navigate to="/dashboard" />;
    // }

    return children;
  };

  const ProtectedStudentRoute = ({ children }) => {
    // guests are redirected to login
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    // tutors are redirected to their tutors dashboard
    if (profile != "student") {
      // profile.role
      return <Navigate to="/tutors" />;
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
              <ProtectedStudentRoute>
                <Dashboard />
              </ProtectedStudentRoute>
            }
          />
          <Route
            path="/tutors"
            element={
              <ProtectedTutorRoute>
                <TutorView />
              </ProtectedTutorRoute>
            }
          />
          <Route
            path="/chats"
            element={<ProtectedRoute>{/* <Chats /> */}</ProtectedRoute>}
          />
          <Route
            path="/create-ticket"
            element={
              <ProtectedStudentRoute>
                <CreateTicket />
              </ProtectedStudentRoute>
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
