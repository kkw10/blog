import React from 'react';
import htmlParser, { domToReact } from 'html-react-parser';
import styled from 'styled-components';

// Components...
import Portrait from './Portrait';
import MoreButtons from './MoreButtons';
import SocialButtons from './SocialButtons';
import EditorContainer from '../../../containers/common/EditorContainer';

// lib...
import { brandingColor } from '../../../lib/styles/branding';
import useToggle from '../../../lib/hooks/toggleHook';

const CommentWrap = styled.div`
  & > .comment-head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > .info {
      display: flex;
      align-items: center;
    }
  }
`;

const UserName = styled.div`
  font-size: 13px;
  color: ${brandingColor.common[6]};
  b {
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {
      color: ${brandingColor.main[6]};
    }
  }
  b::after {
    content: '/';
    display: inline-block;
    margin: 0 5px;
    font-weight: normal;
  }  
`;

const Comment = ({
  type,
  me,
  commentData,
  parentData,
  editingCommentData,
  onEditingFieldSetting,
  onCommentSubmit,
  onDeleteComment,
  onUpdateComment,
  onEditCancel,
  onThumbs,
  onSubThumbs,
  onGetTargetProfile,
  onShowSubComment,
  onHideSubComment,
}) => {
  const [toggle, onToggle] = useToggle();
  const option = { // html-react-parser options
    replace: ({ attribs, children }) => {
      if (!attribs) return;

      if (attribs.class === 'toSomeone') {
        const targetId = attribs.dataid;
        return (
          <span className="toSomeone" onClick={() => onGetTargetProfile(targetId)}>
            {domToReact(children, option)}
          </span>
        );
      }
    },
  };

  return (
    <CommentWrap>
      <div className="comment-head">
        <div className="info">
          <Portrait portraitURL={commentData.User.portrait} type={type} />
          <UserName>
            <b onClick={() => onGetTargetProfile(commentData.UserId)}>
              {commentData.User.nickname}
            </b>
            <span>{new Date(commentData.createdAt).toLocaleDateString()}</span>
          </UserName>
        </div>
        <div className="more">
          {me.user && (commentData.UserId === me.user.id) ? (
            <MoreButtons
              type={type}
              commentData={commentData}
              parentData={parentData}
              onEditingFieldSetting={onEditingFieldSetting}
              onDeleteComment={onDeleteComment}
            />
          ) : null}
        </div>
      </div>
      <div className="comment-body">
        {editingCommentData.id && editingCommentData.id === commentData.id ? (
          <EditorContainer
            visible
            editorName={`tui_updater${commentData.id}`}
            prevData={editingCommentData}
            submitHolder="수정"
            cancelHolder="취소"
            submitEvent={type === 'SUB' ? (
              () => onUpdateComment(commentData.id, parentData.id)
            ) : (
              () => onUpdateComment(commentData.id)
            )}
            cancelEvent={() => onEditCancel(commentData.id)}
            fieldKey="comment"
          />
        ) : (
          <div className="text tui-style tui-editor-contents">
            {htmlParser(commentData.contents, option)}
          </div>
        )}
      </div>
      <div className="comment-foot">
        <SocialButtons
          me={me}
          type={type}
          commentData={commentData}
          onThumbs={onThumbs}
          onSubThumbs={onSubThumbs}
          editorToggle={() => onToggle(`subCommentEditor-${commentData.id}`, 'strict')}
          onShowSubComment={onShowSubComment}
          onHideSubComment={onHideSubComment}
        />
        <EditorContainer
          type={type}
          visible={toggle && toggle.activeStrictToggle === `subCommentEditor-${commentData.id}`}
          editorName={`tui_sub_editor${commentData.id}`}
          toSomeone={commentData.User}
          submitHolder="등록"
          cancelHolder="취소"
          submitEvent={(e) => {
            if (parentData) {
              onCommentSubmit(e, parentData.id);
            } else {
              onCommentSubmit(e, commentData.id);
            }
          }}
          cancelEvent={() => onEditCancel(commentData.id)}
          fieldKey="comment"
        />
      </div>
    </CommentWrap>
  );
};

export default Comment;
