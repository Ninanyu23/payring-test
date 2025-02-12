import React, { useState } from 'react';
import '../css/signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bankAccounts, setBankAccounts] = useState([{ bankName: '', accountNumber: '' }]);
  const [kakaoPayLink, setKakaoPayLink] = useState('');
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태
  const [error, setError] = useState(null);
  const [sentVerificationCode, setSentVerificationCode] = useState(null);
  const [isVerificationCodeValid, setIsVerificationCodeValid] = useState(false);

  // 프로필 이미지 변경 처리
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // 이미지 URL로 설정
      };
      reader.readAsDataURL(file); // 파일을 읽어 미리보기
    }
  };

  // 인증번호 발송 버튼 클릭 시 이메일 형식 검증
  const handleSendVerificationCode = async () => {
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('제대로 된 이메일 주소를 입력 해 주세요');
      return;
    }
    setError(null);
    alert('인증번호가 이메일로 발송되었습니다.');
    // 실제 인증번호 전송 로직(api) 호출
  };

  const handleVerifyCode = () => {
    if (verificationCode === sentVerificationCode) {
      setIsVerificationCodeValid(true);
      setError(null);
      alert('인증번호가 확인되었습니다.');
    } else {
      setIsVerificationCodeValid(false);
      setError('인증번호가 일치하지 않습니다.');
    }
  };

  const handleAddBankAccount = () => {
    setBankAccounts([...bankAccounts, { bankName: '', accountNumber: '' }]);
  };

  const handleBankChange = (index, field, value) => {
    const updatedAccounts = [...bankAccounts];
    updatedAccounts[index][field] = value;
    setBankAccounts(updatedAccounts);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('제대로 된 이메일 주소를 입력 해 주세요');
      return;
    }

    // 비밀번호 길이 검증 (8~16자리)
    if (password.length < 8 || password.length > 16) {
      setError('비밀번호는 8~16자리여야 합니다.');
      return;
    }

    // 비밀번호와 비밀번호 확인 일치 여부 검증
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 인증번호 검증
    if (!isVerificationCodeValid) {
      setError('인증번호를 확인해주세요.');
      return;
    }

    console.log('회원가입 데이터:', { name, email, password, bankAccounts, kakaoPayLink, profileImage });
    window.location.href = '/login';
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        {/* 이름 입력 */}
        <label htmlFor="name">이름</label>
        <div className="input-group">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            required
          />
        </div>

        {/* 이메일 입력 및 인증번호 발송 */}
        <label htmlFor="email">이메일</label>
        <div className="input-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
          />
          <button type="button" className="send-code-btn" onClick={handleSendVerificationCode}>
            인증번호
          </button>
        </div>

        {/* 인증번호 입력 및 확인 */}
        <div className="input-group">
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="인증번호를 입력하세요"
            required
          />
          <button type="button" className="verify-code-btn" onClick={handleVerifyCode}>
            인증확인
          </button>
        </div>

        {/* 비밀번호 입력 */}
        <label htmlFor="password">비밀번호</label>
        <div className="input-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력 (8~16자리)"
            minLength={8}
            maxLength={16}
            required
          />
        </div>

        {/* 비밀번호 확인 */}
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <div className="input-group">
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 재입력"
            minLength={8}
            maxLength={16}
            required
          />
        </div>

        {/* 은행명 및 계좌번호 입력 그룹과 계좌 추가 버튼을 하나의 컨테이너에 포함 */}
        <label htmlFor="bank">송금 받을 은행명 & 계좌번호</label>
        <div className="bank-accounts-container">
          {bankAccounts.map((account, index) => (
            <div key={index} className="input-group bank-input-group">
              <input
                type="text"
                value={account.bankName}
                onChange={(e) => handleBankChange(index, 'bankName', e.target.value)}
                placeholder="은행명 입력"
                className="bank-name-input"
                required
              />
              <input
                type="text"
                value={account.accountNumber}
                onChange={(e) => handleBankChange(index, 'accountNumber', e.target.value)}
                placeholder="계좌번호 입력"
                className="account-number-input"
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddBankAccount} className="add-account-btn">
            + 계좌번호 추가하기
          </button>
        </div>

        {/* 카카오페이 송금 링크 */}
        <label htmlFor="kakaoPayLink">카카오페이 송금 링크(URL)</label>
        <div className="input-group">
          <input
            type="url"
            id="kakaoPayLink"
            value={kakaoPayLink}
            onChange={(e) => setKakaoPayLink(e.target.value)}
            placeholder="카카오페이 송금 링크(URL) 입력"
            required
          />
        </div>

        {/* 프로필 사진 업로드 */}
        <label htmlFor="profileImage">프로필 사진</label>
        <div className="input-group">
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
          {profileImage && <img src={profileImage} alt="Profile" className="profile-image-preview" />}
        </div>

        {/* 오류 메시지 */}
        {error && <p className="error">{error}</p>}

        {/* 회원가입 버튼 */}
        <div className="button-container">
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;