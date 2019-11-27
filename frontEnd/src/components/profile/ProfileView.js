import React from 'react';
import styled from 'styled-components';
import { MdEmail } from 'react-icons/md';
import { TiLocation } from 'react-icons/ti';
import { AiFillFire } from 'react-icons/ai';
import { brandingColor } from '../../lib/styles/branding';

const ProfileViewWrap = styled.div`
  border-radius: 5px;
  position: relative;
`;

const BackgroundArea = styled.div`
  border-radius: 5px 5px 0 0;
  height: 220px;
  background: url('https://wallpapercave.com/wp/wp2401087.jpg') no-repeat;
  background-size: cover;
  background-position-y: 30%;
  border-bottom: 10px solid ${brandingColor.main[7]};
`;

const DataArea = styled.div`
  border-top: 10px solid ${brandingColor.main[4]};
  border-radius: 0 0 5px 5px;
  background: #fff;
  padding-bottom: 3rem;

  .flexWrap {
    padding: 0 3rem;
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: relative;
  }
`;

const Portrait = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3rem;
  border-radius: 5px;
  width: 25%;
  position: relative;
  img {
    max-width: 260px;
    max-height: 260px;
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }
  h2 {
    font-size: 20px;
    color: ${brandingColor.common[6]};
    margin-top: 1rem;
    text-align: center;
  }
  .absoluteWrap {
    position: absolute;
    top: -65%;
    width: 100%;
  }
`;

const Introduce = styled.div`
  width: 50%;
  margin-right: 3rem;
  b {
    font-size: 16px;
    color: ${brandingColor.common[6]};
  }
  p {
    font-size: 13px;
    margin-top: 0.5rem;
    color: ${brandingColor.common[6]};
  }

  .title {
    margin-bottom: 2rem;
  }
`;

const EtcInfo = styled.div`
  width: 25%;

  li {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${brandingColor.common[3]};

    b {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: ${brandingColor.common[6]};
      svg {
        margin-right: 0.5rem;
      }
    }
    p {
      font-size: 12px;
      margin-top: 1rem;
      color: ${brandingColor.common[6]};      
    }    
  }
  li:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const ProfileView = () => {
  return (
    <ProfileViewWrap>
      <BackgroundArea />
      <DataArea>
        <div className="flexWrap">
          <Portrait>
            <div className="absoluteWrap">
              <img src="https://consequenceofsound.net/wp-content/uploads/2019/02/imagine-dragons-reynolds-responds-nickelback-comparison.png?w=807" alt="profileimage"/>
              <h2>UserName</h2>
            </div>
          </Portrait>
          <Introduce>
            <div className="title">
              <b>제목을 작성해주세요.</b>
            </div>
            <div className="desc">
              <p>내용을 작성해주세요.</p>
            </div>
          </Introduce>
          <EtcInfo>
            <ul>
              <li>
                <b>
                  <TiLocation />
                  위치
                </b>
                <p>서울, 강북구</p>
              </li>
              <li>
                <b>
                  <AiFillFire />
                  관심사
                </b>
                <p>자바스크립트, 리액트</p>
              </li>
              <li>
                <b>
                  <MdEmail />
                  메일
                </b>
                <p>tester1@naver.com</p>
              </li>
            </ul>
          </EtcInfo>
        </div>
      </DataArea>
    </ProfileViewWrap>
  )
}

export default ProfileView;