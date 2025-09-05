import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Form from './pages/Form';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import logo from './logo.svg'; // أو غيره لو عندك لوجو تاني

function App() {
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('sbs_submissions');
    return saved ? JSON.parse(saved) : [];
  });

  const addSubmission = (submission) => {
    setSubmissions(prev => {
      const updated = [...prev, submission];
      localStorage.setItem('sbs_submissions', JSON.stringify(updated));
      return updated;
    });
  };

  // Sync مع localStorage
  useEffect(() => {
    localStorage.setItem('sbs_submissions', JSON.stringify(submissions));
  }, [submissions]);

  return (
    <Router>
      <div className="App">
        {/* 🔹 شريط علوي بسيط فيه اللوجو وروابط */}
        <header style={{ padding: '10px', background: '#f0f0f0', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img src={logo} alt="SBS Logo" style={{ height: '40px' }} />
          <nav>
            <Link to="/">التسجيل</Link> |{" "}
            <Link to="/login">تسجيل الدخول</Link> |{" "}
            <Link to="/dashboard">لوحة التحكم</Link>
          </nav>
        </header>

        {/* 🔹 الراوتر */}
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Form addSubmission={addSubmission} />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard submissions={submissions} />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
