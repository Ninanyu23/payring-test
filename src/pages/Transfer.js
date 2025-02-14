import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/transfer.css";

const TransferPage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null); // 실제 파일 데이터 저장
  const [inviteData, setInviteData] = useState({}); // 초대 데이터 저장
  const [userInfo, setUserInfo] = useState({}); // 사용자 정보 저장

  // 쿠키에서 token 가져오기
  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {});
    return cookies[name] || null;
  };

  // 사용자 정보 요청 (user-info API)
  const fetchUserInfo = async () => {
    try {
      const token = getCookie("token"); // 쿠키에서 token 가져오기
      console.log("Token:", token); // token 값 확인

      const response = await axios.get(`/api/users`, {
        headers: {
          "Authorization": `Bearer ${token}`, // Authorization 헤더에 token 포함
        }
      });

      if (response.data) {
        setUserInfo(response.data); // 사용자 정보 설정
      } else {
        alert("사용자 정보를 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error fetching user info:", error.response || error);
      alert("사용자 정보를 불러오는 데 오류가 발생했습니다.");
    }
  };

  // receiver-info API 요청
  const fetchReceiverInfo = async () => {
    try {
      const token = getCookie("token"); // 쿠키에서 token 가져오기
      console.log("Token:", token); // token 값 확인

      const response = await axios.get(`/api/rooms/transfers/${userInfo.transferId}/receiver-info`, {
        headers: {
          "Authorization": `Bearer ${token}`, // Authorization 헤더에 token 포함
        }
      });

      if (response.data.code === "SUCCESS_CREATE_TEMP") {
        const { roomId, roomName, userId, username, payUrl, accounts } = response.data.data;
        setInviteData({
          roomId,
          roomName,
          userId,
          username,
          payUrl,
          accounts
        });
      } else {
        alert("송금 정보를 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error fetching receiver info:", error.response || error);
      alert("송금 정보를 불러오는 데 오류가 발생했습니다.");
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file); // 파일 저장
      const reader = new FileReader();
      reader.onload = (e) => {
        createCanvasImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Canvas를 사용하여 300x300 크기로 맞춤 처리
  // Canvas를 사용하여 정사각형(가로 맞춤)으로 크롭 처리
  const createCanvasImage = (imageSrc) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // bank-info의 가로 크기와 동일한 정사각형 크기 설정
      const size = 400; // 예제: 300x300
      canvas.width = size;
      canvas.height = size;

      // 검은색 배경 채우기
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, size, size);

      // 가로를 기준으로 크롭
      let scale = size / img.width;
      let newWidth = img.width * scale;
      let newHeight = img.height * scale;

      if (newHeight < size) {
        // 세로가 짧으면 다시 조정
        scale = size / img.height;
        newWidth = img.width * scale;
        newHeight = img.height * scale;
      }

      // 중앙 정렬 (x 좌표 이동)
      let xOffset = (size - newWidth) / 2;
      let yOffset = (size - newHeight) / 2;

      ctx.drawImage(img, xOffset, yOffset, newWidth, newHeight);
      setImage(canvas.toDataURL());
    };
  };

  // 송금 인증 API 호출
  const handleTransfer = async () => {
    if (!file) {
      alert("송금 내역 이미지를 업로드해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = getCookie("token"); // 쿠키에서 token 가져오기
      const response = await axios.post(`/api/rooms/transfers/${userInfo.transferId}/verify`, formData, {
        headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` },
      });

      if (response.data.code === "SUCCESS_VERIFY_TRANSFER" && response.data.data.isComplete) {
        alert("송금 인증 성공!");
        navigate("/mypage"); // 성공 시 페이지 이동
      } else {
        alert(`송금 인증 실패: ${response.data.message || '상태 확인 필요'}`);
      }
    } catch (error) {
      alert(`송금 인증 요청 중 오류 발생: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    fetchUserInfo(); // 사용자 정보 요청
  }, []);

  useEffect(() => {
    if (userInfo.transferId) {
      fetchReceiverInfo(); // 사용자의 송금 정보 요청
    }
  }, [userInfo]);

  return (
    <div className="transfer-page">
      <p className="room-name">{inviteData.roomName}</p>
      <h3>{inviteData.username} 님께</h3>
      <p>송금해야 하는 금액<strong> {userInfo.amount && userInfo.amount.toLocaleString()}원</strong></p>

      {inviteData.payUrl && (
        <button
          onClick={() => window.location.href = inviteData.payUrl}
          className="kakao-btn"
        >
          <img src="https://i.namu.wiki/i/DRTBUHA314XYTx-pkzY4XSmQ0Job0j10vQhiETotjLCGUULQemriSC67Yh9UCsYq7Dw7WyvK0GkP9f3jP8r8gA.svg" alt="카카오 로고" className="kakao-logo" />
          카카오로 송금하기
        </button>
      )}

      <p className="or-text">또는</p>

      <div className="bank-info">
        {inviteData.accounts && inviteData.accounts.map((account, index) => (
          <div key={index}>
            <span className="bank-name">{account.bankName}</span>
            <span className="account-number">{account.accountNo}</span>
            <span className="account-holder">{account.receiver}</span>
          </div>
        ))}
      </div>

      {/* 이미지 업로드 아이콘만 표시 */}
      <div className="upload-section">
        <label htmlFor="file-upload" className="upload-icon">
          <span className="material-symbols-outlined">image</span>
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}  // 파일 선택창이 바로 나타나도록
        />
        {image && <img src={image} alt="송금 내역" className="preview-image" />}
      </div>

      <button onClick={handleTransfer} className="transfer-btn">송금 완료</button>
    </div>
  );
};

export default TransferPage;