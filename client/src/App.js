import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <Router>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={
         <PublicRoute>   
        <Login />
        </PublicRoute>
        } />
        <Route path="/register" element={
           <PublicRoute>   
           <Register />
           </PublicRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
