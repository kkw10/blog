import React from 'react';
import styled from 'styled-components';
import { IoIosMore } from 'react-icons/io';

// components...
import DropBox from '../dropbox';

// lib...
import { brandingColor } from '../../../lib/styles/branding';
import useToggle from '../../../lib/hooks/toggleHook';

const MoreButtonsWrap = styled.div`
  position: relative;
  cursor: pointer;
`;

const MoreListWrap = styled.ul`
  width: 60px;
  text-align: center;
  font-size: 12px;
  & > li {
    margin-bottom: 0.5rem;
    padding: 0.3rem;
    cursor: pointer;
    &:hover {
      background: ${brandingColor.point[5]};
      color: #fff;
    }
    &:first-child {
      padding-top: 0.5rem;
    }
    &:last-child {
      padding-bottom: 0.5rem;
      margin-bottom: 0;
    }
  }
`;

const MoreList = ({
  type,
  commentData,
  parentData,
  onEditingFieldSetting,
  onDeleteComment,
}) => {
  return (
    <MoreListWrap>
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
    </MoreListWrap>
  );
};

const MoreButtons = ({
  type,
  commentData,
  parentData,
  onEditingFieldSetting,
  onDeleteComment,
}) => {
  const [toggle, onToggle] = useToggle();

  return (
    <MoreButtonsWrap>
      <DropBox
        visible={toggle && toggle.activeToggle === `commentMore-${commentData.id}`}
        top="20px"
        side="right"
        main={
          <IoIosMore onClick={() => onToggle(`commentMore-${commentData.id}`)} />
        }
        list={
          <MoreList
            type={type}
            commentData={commentData}
            parentData={parentData}
            onEditingFieldSetting={onEditingFieldSetting}
            onDeleteComment={onDeleteComment}
          />
        }
      />
    </MoreButtonsWrap>
  )
};

export default MoreButtons;
