import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTicket from "./pages/CreateTicket";
import Tickets from "./pages/Tickets";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import Chats from "./components/Chats";
import Sidenav from "./components/Sidenav";

// Function to query a document in the "webUsers" collection by UID
async function getUserRole(uid) {
  try {
    const docRef = doc(db, 'webUsers', uid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const documentData = docSnapshot.data();
      console.log('Document data:', documentData.role);
      return documentData.role;
    } else {
      console.log('Document does not exist.');
      return null;
    }
  } catch (error) {
    console.error('Error querying document:', error);
    throw error;
  }
}

function App() {
  const { currentUser } = useContext(AuthContext);
  // const role = currentUser ? getUserRole(currentUser.uid).then((role) => role) : null;
  const role = getUserRole(currentUser.uid);
  console.log(currentUser)
  console.log(role)

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
              <Route path="/chats" element={<Tickets />} />
              <Route path="/create-ticket" element={<CreateTicket />} />
              <Route path="/planner" />
              <Route path="/search" />
            </>
          )}
          {role === 'student' && (
            <>
            <Route path="/chats" element={<Tickets />} />
            <Route path="/create-ticket" element={<CreateTicket />} />
              <Route path="/planner" />
              <Route path="/search" />
            </>
          )}
          <Route path="/chats" element={<Tickets />} />
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
