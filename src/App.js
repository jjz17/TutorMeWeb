import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTicket from "./pages/CreateTicket";
import Tickets from "./pages/Tickets";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { RoleContext } from "./context/RoleContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import Chats from "./components/Chats";
import Sidenav from "./components/Sidenav";

function App() {
  const { currentUser, role } = useContext(AuthContext);
  // const { currentUser, role } = useContext(RoleContext);
  // const { currentUser } = useContext(RoleContext);
  // const currentUser = role;
  // const role = currentUser;
  console.log("CurrUSer is ", currentUser)
  console.log("Role is", role)

  // const userRole = useContext(RoleContext);
  // const currentUser = userRole;
  // const role = userRole;
  // console.log(userRole)


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
          {role === 'tutor' && (
            <>
              {/* <Route path="/chats" element={<Tickets />} /> */}
              <Route path="/create-ticket" element={<CreateTicket />} />
              <Route path="/planner" />
              <Route path="/search" />
            </>
          )}
          {role === 'student' && (
            <>
              {/* <Route path="/chats" element={<Tickets />} /> */}
              <Route path="/create-ticket" element={<CreateTicket />} />
              <Route path="/planner" />
              <Route path="/search" />
            </>
          )}
          {/* <Route path="/chats" element={<Tickets />} /> */}
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/unauthorized" component={Sidenav} />
        <Redirect to="/unauthorized" /> Fallback route for unauthorized access */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
