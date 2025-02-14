import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import MyPage from './pages/MyPage';
import EditPage from './pages/EditPage';
import Invite from './pages/Invite';
import TransferPage from './pages/Transfer';
import PaymentStatusPage from './pages/PaymentStatus';
import TransferSend from './pages/TransferSend';
import TransferRecieve from './pages/TransferRecieve';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path='/PaymentStatus' element={<PaymentStatusPage />} />
        <Route path='/TransferSend' element={<TransferSend />} />
        <Route path='/TransferRecieve' element={<TransferRecieve />} />
      </Routes>
    </Router>
  );
};

export default App;