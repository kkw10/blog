import React from 'react';
import styled from 'styled-components';
import { IoIosMore } from 'react-icons/io';

// components...
import DropBox from '../dropbox';

// lib...
import { brandingColor } from '../../../lib/styles/branding';

const MoreButtonsWrap = styled.div`
  position: relative;
  cursor: pointer;

  .buttons-content {
    width: 60px;
    text-align: center;
    font-size: 12px;
    li {
      margin-bottom: 0.5rem;
      padding: 0.3rem;
      cursor: pointer;
      &:hover {
        background: ${brandingColor.point[5]};
        color: #fff;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const MoreButtons = ({
  type,
  commentData,
  parentData,
  commentMoreToggle,
  toggle,
  onEditingFieldSetting,
  onDeleteComment,
}) => {
  return (
    <MoreButtonsWrap>
      <IoIosMore
        onClick={() => commentMoreToggle(commentData.id)}
      />
      <DropBox
        visible={toggle && toggle.activeToggle === `commentMore-${commentData.id}`}
        top="20px"
      >
        <ul className="buttons-content">
          <li onClick={() => onEditingFieldSetting(commentData.id, commentData.contents)}>
            수정
          </li>
          <li onClick={type === 'SUB' ? (
            () => onDeleteComment(commentData.id, parentData.id)
          ) : (
            () => onDeleteComment(commentData.id)
          )}>
            삭제
          </li>
        </ul>
      </DropBox>
    </MoreButtonsWrap>
  )
};

export default MoreButtons;
