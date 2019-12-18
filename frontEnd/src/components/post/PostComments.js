import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import styled from 'styled-components';
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css'; // codemirror
import 'highlight.js/styles/github.css'; // code block highlight
import Editor from 'tui-editor';
import { brandingColor } from '../../lib/styles/branding';
import useToggle from '../../lib/hooks/toggleHook';

// Component...
import Button from '../common/Button';
import Comment from '../common/Comment';
import LoadingWrap from '../common/LoadingWrap';
import InfoModal from '../common/modal/InfoModal';

const PostCommentsWrap = styled.div`
  .tui-editor-defaultUI {
    border-radius: 5px;
  }

  .tui-editor-defaultUI-toolbar {
    border-radius: 5px 5px 0 0;
  }

  .te-ww-container {
    border-radius: 0 0 5px 5px;
  }
`;

const Form = styled.form`
  background: #fff;
  margin-bottom: 2rem;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 2rem;
  border-top: 1px solid ${brandingColor.common[2]};
  padding-top: 2rem;

  .button {
    text-align: right;
    margin-top: 1rem;

    button {
      text-align: center;
      & > * {
        display: inline-block;
      }
    }
  }
`;

const CommentsList = styled.div`
  & .comment-border-wrap {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${brandingColor.common[2]};

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
  }
`;

const SubComment = styled.div`
  margin: 0.5rem 0;
  padding: 1rem;
  padding-left: 2rem;
  border-radius: 5px;
  color: ${brandingColor.common[6]};
  font-size: 20px;
  position: relative;
`;

const PostComments = ({
  me,
  commentsResult,
  editingCommentData,
  commentError,
  onInitialize,
  onChangeField,
  onCommentSubmit,
  onEditingFieldSetting,
  onDeleteComment,
  onUpdateComment,
  onThumbsUp,
  onThumbsDown,
  onRefresh,
  onShowSubComment,
  onHideSubComment,
  onGetTargetProfile,
}) => {
  const mounted = useRef(false);
  const instance = useRef(null);
  const [formClear, setFormClear] = useState(false);
  const [buttonType, setButtonType] = useState('새로고침');
  const [toggle, onToggle] = useToggle();

  if (commentError) {
    return (
      <PostCommentsWrap>
        {commentError}
      </PostCommentsWrap>
    );
  }

  // 메인 댓글 에디터 버튼, 새로고침 or 댓글 전환
  const onClick = useCallback((e) => {
    e.preventDefault();

    if (buttonType === '댓글') {
      if (!me.user) {
        onToggle('info');
        return;
      }
      onCommentSubmit(e);
      setFormClear(true);
      return;
    }
    onRefresh();
  }, [onCommentSubmit, onRefresh]);

  useEffect(() => { // 포스트 댓글 작성 에디터
    if (!me) return;

    if (!mounted.current) {
      mounted.current = true;
      instance.current = new Editor({
        el: document.querySelector('#tui_editor'),
        initialEditType: 'wysiwyg',
        previewStyle: 'vertical',
        height: '200px',
        placeholder: '내용',
      });

      instance.current.on('change', () => {
        const data = instance.current.getHtml();

        if (data) {
          setButtonType('댓글');
        } else {
          setButtonType('새로고침');
        }

        onChangeField({
          key: 'comment',
          value: data,
        });
      });
    }

    if (mounted.current && formClear) {
      instance.current.setValue('');
      setFormClear(false);
    }
  }, [me, onChangeField, formClear]);

  return (
    <PostCommentsWrap>
      {me && (
        <>
          <Form>
            <div id="tui_editor" />
            <div className="button">
              <Button
                placeholder={buttonType}
                loadingType={
                  buttonType === '새로고침' ? 'post/REFRESH_COMMENTS' : 'write/COMMENTING'
                }
                size="mx"
                background="point"
                onClick={onClick}
              />
            </div>
          </Form>
        </>
      )}
      <CommentsList>
        {commentsResult.map((comment) => {
          const isLiked = comment.Likers && comment.Likers.find((v) => v.id === me.user.id);
          const isDisliked = comment.Dislikers && comment.Dislikers.find((v) => v.id === me.user.id);
          return (
            <div className="comment-border-wrap">
              <Comment
                key={comment.id}
                me={me}
                commentData={comment}
                editingCommentData={editingCommentData}
                onEditingFieldSetting={onEditingFieldSetting}
                onCommentSubmit={onCommentSubmit}
                onDeleteComment={onDeleteComment}
                onUpdateComment={onUpdateComment}
                onEditCancel={onInitialize}
                onThumbsUp={onThumbsUp}
                onThumbsDown={onThumbsDown}
                onGetTargetProfile={onGetTargetProfile}
                isLiked={isLiked}
                isDisliked={isDisliked}
                onShowSubComment={onShowSubComment}
                onHideSubComment={onHideSubComment}
              />
              {comment.isOpen && (comment.ChildComment && comment.ChildComment.map((child) => {
                if (child) {
                  return (
                    <SubComment>
                      <div className="comment-border-wrap">
                        <Comment
                          key={child.id}
                          type="SUB"
                          me={me}
                          commentData={child}
                          parentData={comment}
                          editingCommentData={editingCommentData}
                          onEditingFieldSetting={onEditingFieldSetting}
                          onCommentSubmit={onCommentSubmit}
                          onDeleteComment={onDeleteComment}
                          onUpdateComment={onUpdateComment}
                          onEditCancel={onInitialize}
                          onThumbsUp={onThumbsUp}
                          onThumbsDown={onThumbsDown}
                          onGetTargetProfile={onGetTargetProfile}
                        />
                      </div>
                    </SubComment>
                  );
                }
              }))}
            </div>
          );
        })}
        <LoadingWrap
          loadingType="post/READ_COMMENTS"
          styleType="comments"
          size={20}
          color={brandingColor.point[6]}
        />
      </CommentsList>
      <InfoModal
        title="알림"
        description="로그인이 필요한 기능입니다."
        visible={toggle && toggle.activeToggle === 'info'}
        onCancel={() => onToggle('info')}
      />
    </PostCommentsWrap>
  );
};

export default PostComments;
