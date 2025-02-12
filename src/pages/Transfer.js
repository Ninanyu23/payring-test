import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TransferPage = () => {
  const navigate = useNavigate();

  // 더미 데이터 설정
  const inviteData = {
    roomName: "친구들과 더치페이",
    receiverName: "김철수",
    amount: 50000,
    kakaoLink: "https://kakaopay.com/example"
  };

  const handleTransfer = () => {
    alert("송금 인증 성공!");
    navigate("/mypage"); // 경로 수정
  };

  return (
    <div className="transfer-page">
      <h2>&#36;&#123;{inviteData.roomName}&#125;</h2>
      <h3>{inviteData.receiverName} 님께</h3>
      <p>송금해야 하는 금액<strong> {inviteData.amount.toLocaleString()}원</strong></p>

      {inviteData.kakaoLink && (
        <a href={inviteData.kakaoLink} className="kakao-transfer-btn">
          카카오로 송금하기
        </a>
      )}

      <button onClick={handleTransfer} className="transfer-btn">송금 완료</button>
    </div>
  );
};

export default TransferPage;
