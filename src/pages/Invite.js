import React, { useState } from 'react';
import '../css/invite.css';

const Invite = () => {
    const [invites, setInvites] = useState([
        { id: 1, roomName: '개발자 스터디', members: 5 },
        { id: 2, roomName: '친구들과 더치페이', members: 3 },
        { id: 3, roomName: '가족 여행 정산', members: 6 }
    ]);

    const handleAccept = (id) => {
        setInvites(invites.filter(invite => invite.id !== id));
        alert('초대를 수락했습니다.');
    };

    const handleReject = (id) => {
        setInvites(invites.filter(invite => invite.id !== id));
        alert('초대를 거절했습니다.');
    };

    return (
        <div className="invite-container">
            <h2>방 초대 내역</h2>
            {invites.map(invite => (
                <div key={invite.id} className="invite-card">
                    <div className="invite-info">
                        <p className="room-name"><strong>&#36;&#123;{invite.roomName}&#125;</strong></p>
                        <p className="member-count">참여 인원 {invite.members}명</p>
                    </div>
                    <div className="invite-buttons">
                        <button className="accept-btn" onClick={() => handleAccept(invite.id)}>수락</button>
                        <button className="reject-btn" onClick={() => handleReject(invite.id)}>거절</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Invite;