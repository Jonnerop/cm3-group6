import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import EditJobPage from "./pages/EditJobPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="job/:id" element={<JobPage />} />
              <Route
                path="job/:id/edit"
                element={<ProtectedRoute element={EditJobPage} />}
              />
              <Route
                path="create"
                element={<ProtectedRoute element={AddJobPage} />}
              />
              <Route path="*" element={<h1>404 Not Found</h1>} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
