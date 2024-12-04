import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import EditJobPage from "./pages/EditJobPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="job/:id" element={<JobPage />} />
            <Route path="job/edit/:id" element={<EditJobPage />} />
            <Route path="create" element={<AddJobPage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;