import React, { useState } from 'react';
import '../css/mypage.css';
import PageNavigationButton from '../components/PageNavigate';

const MyPage = () => {
    const [userInfo, setUserInfo] = useState({
        name: '홍길동',
        email: 'hong@example.com',
        bankName: '국민은행',
        accountNumber: '123-456-7890',
        kakaoPayUrl: 'https://kakaopay.example.com',
    });

    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
    const [editedInfo, setEditedInfo] = useState(userInfo); // 입력된 정보

    const handleModifyClick = () => {
        setIsEditing(true); // 수정 모드 활성화
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = () => {
        setUserInfo(editedInfo); // 정보 업데이트
        setIsEditing(false); // 수정 모드 종료
    };

    return (
        <div className='mypage-wrapper'>
            <div className="my-page-container">
                <span className="material-symbols-outlined edit-icon" onClick={handleModifyClick}>
                    edit
                </span>

                <div className="info">
                    <span className="info-label">이메일</span>
                    <div className="info-item">
                        {isEditing ? (
                            <input type="email" name="email" value={editedInfo.email} onChange={handleInputChange} />
                        ) : (
                            <span className="info-value">{userInfo.email}</span>
                        )}
                    </div>

                    <span className="info-label">은행</span>
                    <div className="info-item">
                        {isEditing ? (
                            <input type="text" name="bankName" value={editedInfo.bankName} onChange={handleInputChange} />
                        ) : (
                            <span className="info-value">{userInfo.bankName}</span>
                        )}
                    </div>

                    <span className="info-label">계좌번호</span>
                    <div className="info-item">
                        {isEditing ? (
                            <input type="text" name="accountNumber" value={editedInfo.accountNumber} onChange={handleInputChange} />
                        ) : (
                            <span className="info-value">{userInfo.accountNumber}</span>
                        )}
                    </div>
                    <span className="info-label">카카오페이 URL</span>
                    <div className="info-item">
                        {isEditing ? (
                            <input type="url" name="kakaoPayUrl" value={editedInfo.kakaoPayUrl} onChange={handleInputChange} />
                        ) : (
                            <span className="info-value">
                                <a href={userInfo.kakaoPayUrl} target="_blank" rel="noopener noreferrer">
                                    {userInfo.kakaoPayUrl}
                                </a>
                            </span>
                        )}
                    </div>

                    {isEditing && (
                        <button className="save-btn" onClick={handleSaveClick}>저장</button>
                    )}
                </div>
            </div>
            {!isEditing && (
                <div className="invite-btn">
                    <PageNavigationButton label="방 초대 내역 보러 가기" to="/invite" />
                </div>
            )}
        </div>
    );
};

export default MyPage;