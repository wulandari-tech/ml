import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RequestForm from './components/RequestForm';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/request">Request</Link>
                    <Link to="/admin">Admin</Link>
                </nav>

                <Routes>
                    <Route path="/request" element={<RequestForm />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/" element={<h1>Welcome</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;