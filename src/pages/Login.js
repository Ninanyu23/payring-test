import React, { useState } from 'react';
import '../css/login.css';
import PageNavigationButton from '../components/PageNavigate';  // PageNavigationButton 임포트

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // 로그인 요청 함수
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력하세요.');
      return;
    }

    try {
      // 로그인 API 호출 (백엔드와 연동)
      const response = await fetch('http://your-api-endpoint/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공
        console.log('로그인 성공:', data);
        localStorage.setItem('token', data.token);
        window.location.href = '/home';
      } else {
        setError(data.message || '로그인에 실패했습니다.');
      }
    } catch (err) {
      setError('서버에 연결할 수 없습니다.');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className='guest'>
        <img src="/guest.png" alt="Guest Icon" />
      </div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="이메일을 입력하세요"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}

        <div className="button-container">
          <div className='login-btn'><button type="submit">로그인</button></div>
          <PageNavigationButton label="회원가입" to="/signup" />
        </div>
      </form>
    </div>
  );
};

export default Login;