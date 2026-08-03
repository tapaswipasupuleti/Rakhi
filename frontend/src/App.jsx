import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import SOS from "./pages/SOS";
import SafeWalk from "./pages/SafeWalk";
import FakeCall from "./pages/FakeCall";
import RecordEvidence from "./pages/RecordEvidence";
import History from "./pages/History";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contacts"
        element={
          <ProtectedRoute>
            <Contacts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sos"
        element={
          <ProtectedRoute>
            <SOS />
          </ProtectedRoute>
        }
      />

      <Route
        path="/safewalk"
        element={
          <ProtectedRoute>
            <SafeWalk />
          </ProtectedRoute>
        }
      />

      <Route
        path="/fakecall"
        element={
          <ProtectedRoute>
            <FakeCall />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recordevidence"
        element={
          <ProtectedRoute>
            <RecordEvidence />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
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

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;