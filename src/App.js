import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import MyPage from './pages/MyPage';
import Invite from './pages/Invite';
import TransferPage from './pages/Transfer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/transfer" element={<TransferPage />} /> {/* TransferPage 경로 */}
      </Routes>
    </Router>
  );
};

export default App;