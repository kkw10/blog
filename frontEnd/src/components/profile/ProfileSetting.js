import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { brandingColor } from '../../lib/styles/branding';

const ProfileSettingWrap = styled.div`
  h2 {
    font-size: 20px;
    margin-bottom: 2rem;
    color: ${brandingColor.point[6]};
  }

  .flexWrap {
    display: flex;
  }
`;

const ImageArea = styled.div`
  width: 260px;
  margin-right: 2rem;
  .mirror {
    margin-bottom: 0.5rem;
    img {
      max-width: 260px;
      max-height: 260px;
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
`;

const InputArea = styled.div`
  width: 100%;
  input {
    width: 100%;
    height: 32px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 0 0.5rem;
    border-color: ${brandingColor.common[3]};
  }
  textarea {
    width: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    border-color: ${brandingColor.common[3]};
  }
  fieldset {
    margin-bottom: 2rem;
  }
  fieldset + fieldset {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-bottom: 1rem;
    p {
      font-size: 14px;
      font-weight: bold;
      color: ${brandingColor.common[6]};
      margin-bottom: 0.5rem;
    }
  }
  .buttons {
    float: right;
    button + button {
      margin-left: 0.5rem;
    }
  }
`;

const ProfileSetting = ({
  portraitEl,
  onChangePortrait,
  onClickPortrait,
  onChangeField,
}) => {
  return (
    <ProfileSettingWrap>
      <h2>프로필 수정</h2>
      <form encType="multipart/form-data">
        <div className="flexWrap">
          <ImageArea>
            <input type="file" hidden ref={portraitEl} onChange={(e) => onChangePortrait(e)} />
            <div className="mirror">
              <img src="https://consequenceofsound.net/wp-content/uploads/2019/02/imagine-dragons-reynolds-responds-nickelback-comparison.png?w=807" alt="" />
            </div>
            <Button
              placeholder="이미지 업로드"
              size="mx"
              background="point"
              onClick={(e) => onClickPortrait(e)}
            />
          </ImageArea>
          <InputArea>
            <fieldset>
              <label htmlFor="user_title">
                <p>제목</p>
                <input
                  type="text"
                  name="user_title"
                  id="user_title"
                  onChange={(e) => onChangeField(e)}
                />
              </label>
              <label htmlFor="user_description">
                <p>내용</p>
                <textarea
                  name="user_description"
                  id="user_description"
                  onChange={(e) => onChangeField(e)}
                />
              </label>
            </fieldset>
            <fieldset>
              <label htmlFor="user_location">
                <p>위치</p>
                <input
                  type="text"
                  name="user_location"
                  id="user_location"
                  onChange={(e) => onChangeField(e)}
                />
              </label>
              <label htmlFor="user_favorite">
                <p>관심사</p>
                <input
                  type="text"
                  name="user_favorite"
                  id="user_favorite"
                  onChange={(e) => onChangeField(e)}
                />
              </label>
              <label htmlFor="user_contact">
                <p>메일</p>
                <input
                  type="text"
                  name="user_contact"
                  id="user_contact"
                  onChange={(e) => onChangeField(e)}
                />
              </label>
            </fieldset>
            <div className="buttons">
              <Button
                placeholder="수정"
                size="md"
                background="point"
              />
              <Button
                placeholder="취소"
                size="md"
              />
            </div>
          </InputArea>
        </div>
      </form>
    </ProfileSettingWrap>
  );
};

export default ProfileSetting;