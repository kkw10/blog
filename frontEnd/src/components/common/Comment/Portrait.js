import React from 'react';
import { FaUserAstronaut } from 'react-icons/fa';
import styled, { css } from 'styled-components';

// lib...
import { brandingColor } from '../../../lib/styles/branding';

const CommentPortraitWrap = styled.div`
  margin-right: 0.5rem;

  & > .target-user {
    img {
      border-radius: 5px;
      width: 30px;
      height: 30px;
    }
  }

  ${props => (
    props.type === 'SUB' && css`
      & > .target-user {
        img {
          border-radius: 5px;
          width: 24px;
          height: 24px;
        }
      }    
    `
  )}

  & > .default-user {
    font-size: 16px;
    color: #fff;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background: ${brandingColor.common[4]};
    display: flex;
    align-items: center;
    justify-content: center;    
  }
`;

const CommentPortrait = ({ portraitURL, type }) => {
  return (
    <CommentPortraitWrap type={type}>
      {portraitURL ? (
        <div className="target-user">
          <img src={`http://localhost:1991/${portraitURL}`} alt="유저 이미지" />
        </div>
      ) : (
        <div className="default-user">
          <FaUserAstronaut />
        </div>
      )}
    </CommentPortraitWrap>
  )
};

export default CommentPortrait;
