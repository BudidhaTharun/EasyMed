import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AllDoctors from "./pages/AllDoctors";
import Appointments from "./pages/Appointments";
import Profile from "./pages/Profile";
import AuthPage from "./pages/AuthPage";
import PrivateRoute from "./components/PrivateRoute";
import History from "./pages/History"; // Import the new History component
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/authpage" element={<AuthPage />} />
            <Route
              path="/doctors"
              element={
                <PrivateRoute>
                  <AllDoctors />
                </PrivateRoute>
              }
            />
            <Route
              path="/appointments/:doctorId"
              element={
                <PrivateRoute>
                  <Appointments />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <History />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
