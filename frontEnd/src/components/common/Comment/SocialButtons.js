import React, { useCallback } from 'react';
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
      color: ${(props) => (props.fill ? brandingColor.main[5] : brandingColor.common[4])};
      margin-right: 0.5rem;
      transition: 0.2s ease-in-out;
      &:hover { color: ${brandingColor.main[5]} }
    }
`;

const SocailButtons = ({
  me,
  type,
  commentData,
  onThumbs,
  onSubThumbs,
  editorToggle,
  onShowSubComment,
  onHideSubComment,
}) => {
  const [toggle, onToggle] = useToggle();
  const onThumbsClick = useCallback((thumbType, commentId) => {
    if (type === 'SUB') {
      onSubThumbs(thumbType, commentId);
    } else {
      onThumbs(thumbType, commentId);
    }
  }, [type]);

  return (
    <SocailButtonsWrap>
      <div className="thumbs-area">
        <ThumbsButton fill={commentData.isLiked}>
          <AiFillLike
            onClick={me.user ? () => onThumbsClick('up', commentData.id) : () => onToggle('warn')}
          />
          <span>{(commentData.likeNumb) || 0}</span>
        </ThumbsButton>
        <ThumbsButton fill={commentData.isDisliked}>
          <AiFillDislike
            onClick={me.user ? () => onThumbsClick('down', commentData.id) : () => onToggle('warn')}
          />
          <span>{(commentData.dislikeNumb) || 0}</span>
        </ThumbsButton>
        <button
          className="sub-comment"
          type="button"
          onClick={me.user ? editorToggle : () => onToggle('warn')}
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
