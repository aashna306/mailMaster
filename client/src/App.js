import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Edit from "./pages/Edit/Edit.jsx";
import DomainOption from "./pages/domainOption/domainOption.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import MailsIdsAuthorize from "./pages/Separated_Mails/Mails_IdsAuthorize.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/edit"
            element={
              <ProtectedRoute>
                <Edit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/domain-option"
            element={
              <ProtectedRoute>
                <DomainOption />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/separation"
            element={
              <ProtectedRoute>
                <MailsIdsAuthorize />
              </ProtectedRoute>
            }
          />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
