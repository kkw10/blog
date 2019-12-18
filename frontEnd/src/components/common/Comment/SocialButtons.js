import React from 'react';
import styled from 'styled-components';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';

// lib...
import { brandingColor } from '../../../lib/styles/branding';
import useToggle from '../../../lib/hooks/toggleHook';

const SocailButtonsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > .thumbs-area {
    display: flex;
    font-size: 13px;
    color: ${brandingColor.common[5]};

    & > .sub-comment {
      display: flex;
      font-size: 13px;
      color: ${brandingColor.common[5]};      
      cursor: pointer;
      transition: 0.2s ease-in-out;
      &:hover { color: ${brandingColor.main[5]} }
    }    
  }

  & > .child-comment-area {
    font-size: 13px;
    cursor: pointer;
    color: ${brandingColor.common[5]};
    &:hover { color: ${brandingColor.main[5]} };
    span { margin-left: 0.2rem; }
  }
`;

const ThumbsButton = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
    
    & > svg {
      cursor: pointer;
      font-size: 16px;
      color: ${(props) => (props.fill === 'point' ? brandingColor.main[5] : brandingColor.common[4])};
      margin-right: 0.5rem;
      transition: 0.2s ease-in-out;
      &:hover { color: ${brandingColor.main[5]} }
    }
`;

const SocailButtons = ({
  me,
  type,
  isLiked,
  isDisliked,
  commentData,
  onThumbsUp,
  onThumbsDown,
  editorToggle,
  onShowSubComment,
  onHideSubComment,
}) => {
  const [toggle, onToggle] = useToggle();

  return (
    <SocailButtonsWrap>
      <div className="thumbs-area">
        <ThumbsButton fill={isLiked ? 'point' : 'common'}>
          <AiFillLike
            onClick={me.user ? () => onThumbsUp(commentData.id) : () => onToggle('info')}
          />
          <span>{(commentData.Likers && commentData.Likers.length) || 0}</span>
        </ThumbsButton>
        <ThumbsButton fill={isDisliked ? 'point' : 'common'}>
          <AiFillDislike
            onClick={me.user ? () => onThumbsDown(commentData.id) : () => onToggle('info')}
          />
          <span>{(commentData.Dislikers && commentData.Dislikers.length) || 0}</span>
        </ThumbsButton>
        <button
          className="sub-comment"
          type="button"
          onClick={me.user ? editorToggle : () => onToggle('info')}
        >
          댓글 달기
        </button>
      </div>
      {type === 'SUB' ? null : (
        <>
          {commentData.isOpen ? (
            <div
              className="child-comment-area"
              onClick={() => onHideSubComment(commentData.id)}
            >
              댓글 닫기
            </div>
          ) : (
            <div
              className="child-comment-area"
              onClick={(commentData.subCommentsNumb > 0) ? () => onShowSubComment(commentData.id) : null}
            >
              댓글
              <span>{commentData.subCommentsNumb || 0}</span>
            </div>
          )}
        </>
      )}
    </SocailButtonsWrap>
  );
};

export default SocailButtons;
