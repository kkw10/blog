import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  AiFillDislike,
  AiFillLike,
} from 'react-icons/ai';
import { FaUserAstronaut } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IoIosMore } from 'react-icons/io';
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css'; // codemirror
import 'highlight.js/styles/github.css'; // code block highlight
import Editor from 'tui-editor';
import { toggling } from '../../models/actions/toggle';
import { brandingColor } from '../../lib/styles/branding';
import Button from '../common/Button';
import DropBox from '../common/dropbox';

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
      display: inline-block;
    }
  }
`;

const CommentsList = styled.div`
`;

const CommentsBox = styled.div`
  font-size: 13px;
  padding: 1rem 0;
  border-bottom: 1px solid ${brandingColor.common[2]};

  .text {
    margin: 1rem 0;
  }

  .tools {
    display: flex;

    svg {
      font-size: 16px;
      cursor: pointer;
      margin-right: 0.5rem;
    }
    
    span {
      display: inline-block;
      margin-right: 1rem;
      color: ${brandingColor.common[4]};
    }
  }
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .info {
    display: flex;
    align-items: center;
    & > .info_portrait {
      margin-right: 0.5rem;
      img {
        border-radius: 5px;
        width: 30px;
        height: 30px;
      }

      .default_user {
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
    }

    & > .info_name {
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
    }
  }
  .more {
    color: ${brandingColor.common[6]};
    font-size: 20px;
    position: relative;
    svg {
      cursor: pointer;
    }
  }
`;

const Content = styled.div`
  .editingArea {
    overflow: hidden;
    margin: 1rem 0;
  };

  #tui_updater {
    .te-mode-switch-section {
      display: none!important;
    }
  };

  .buttons {
    float: right;
    margin-top: 0.5rem;
    button + button {
      margin-left: 0.5rem;
    }
  };
`;

const MoreBox = styled.ul`
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
`;

const SubComment = styled.div`
  color: ${brandingColor.common[4]};
`;

const SvgWrap = styled.div`
  color: ${(props) => (props.fill === 'point' ? brandingColor.main[5] : brandingColor.common[4])};
`;

const PostComments = ({
  user,
  commentsData,
  commentError,
  onChangeField,
  onSubmit,
  clearedForm,
  onEditComment,
  editingCommentData,
  onEditCancel,
  onThumbsUp,
  onThumbsDown,
  onDeleteComment,
  onUpdateComment,
  onGetTargetProfile,
  onRefresh,
}) => {
  const dispatch = useDispatch();
  const toggle = useSelector(({ toggle }) => (toggle));
  const mounted = useRef(false);
  const mountedComment = useRef(commentsData.reduce((acc, cur) => {
    acc[`${cur.id}`] = false;
    return acc;
  }, {}));
  const instance = useRef(null);
  const updateInstance = useRef(null);
  const [test, setTest] = useState('새로고침');

  if (commentError) {
    return (
      <PostCommentsWrap>
        {commentError}
      </PostCommentsWrap>
    );
  }

  const onClick = useCallback((e) => {
    e.preventDefault();
    if (test === '댓글') {
      onSubmit(e);
      return;
    }
    onRefresh();
  }, [onSubmit, onRefresh]);

  const commentMoreToggle = useCallback((id) => {
    dispatch(toggling(`commentMore-${id}`));
  }, [dispatch]);

  const onEditCommentClick = useCallback((commentId) => {
    onEditComment(commentId);
    dispatch(toggling(`commentMore-${commentId}`));
  }, [dispatch, onEditComment]);

  const onDeleteCommentClick = useCallback((commentId) => {
    onDeleteComment(commentId);
    dispatch(toggling(`commentMore-${commentId}`));
  }, [dispatch, onDeleteComment]);

  const onUpdateCommentClick = useCallback((commentId) => {
    onUpdateComment(commentId);
    mountedComment.current[commentId] = false;
  }, [onUpdateComment]);

  const onEditCancelClick = useCallback((commentId) => {
    onEditCancel();
    mountedComment.current[commentId] = false;
  });

  useEffect(() => { // 포스트 댓글 작성 에디터
    if (!user) return;

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
          setTest('댓글');
        } else {
          setTest('새로고침');
        }

        onChangeField({
          key: 'comment',
          value: data,
        });
      });
    }

    if (mounted.current && clearedForm) {
      instance.current.setValue('');
    }
  }, [user, onChangeField, clearedForm]);

  useEffect(() => { // 댓글 수정 관련 에디터
    const target = editingCommentData.id;
    if (!target) return;

    if (!mountedComment.current[target]) {
      mountedComment.current[target] = true;
      updateInstance.current = new Editor({
        el: document.querySelector(`#tui_updater${editingCommentData.id}`),
        initialEditType: 'wysiwyg',
        previewStyle: 'vertical',
        height: '200px',
      });

      updateInstance.current.setValue(editingCommentData.contents);

      updateInstance.current.on('change', () => {
        const data = updateInstance.current.getHtml();

        onChangeField({
          key: 'comment',
          value: data,
        });
      });
    }

  }, [editingCommentData, onChangeField]);

  return (
    <PostCommentsWrap>
      {user && (
        <>
          <Form>
            <div id="tui_editor" />
            <div className="button">
              <Button
                placeholder={test}
                size="mx"
                background="point"
                onClick={onClick}
              />
            </div>
          </Form>
        </>
      )}
      <CommentsList>
        {commentsData.map((comment) => {
          const isLiked = user && comment.Likers && comment.Likers.find((v) => v.id === user.id);
          const isDisliked = user && comment.Dislikers && comment.Dislikers.find((v) => v.id === user.id);
          return (
            <CommentsBox key={comment.id}>
              <Head>
                <div className="info">
                  <div className="info_portrait">
                    {comment.User.portrait ? (
                      <img src={`http://localhost:1991/${comment.User.portrait}`} alt="" />
                    ) : (
                      <div className="default_user">
                        <FaUserAstronaut />
                      </div>
                    )}
                  </div>
                  <div className="info_name">
                    <b onClick={() => onGetTargetProfile(comment.UserId)}>
                      {comment.User.nickname}
                    </b>
                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                {comment.UserId === user.id ? (
                  <div className="more">
                    <IoIosMore
                      onClick={() => commentMoreToggle(comment.id)}
                    />
                    <DropBox
                      visible={toggle.activeToggle === `commentMore-${comment.id}`}
                      top="20px"
                    >
                      <MoreBox>
                        <li onClick={() => onEditCommentClick(comment.id)}>수정</li>
                        <li onClick={() => onDeleteCommentClick(comment.id)}>삭제</li>
                      </MoreBox>
                    </DropBox>
                  </div>
                ) : null}
              </Head>
              <Content>
                {editingCommentData.id && editingCommentData.id === comment.id ? (
                  <div className="editingArea">
                    <div id={`tui_updater${comment.id}`} />
                    <div className="buttons">
                      <Button
                        placeholder="수정"
                        size="md"
                        background="point"
                        onClick={() => onUpdateCommentClick(comment.id)}
                      />
                      <Button
                        placeholder="취소"
                        size="md"
                        onClick={() => onEditCancelClick(comment.id)}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="text tui-style tui-editor-contents"
                    dangerouslySetInnerHTML={{ __html: comment.contents }}
                  />
                )}
              </Content>
              <div className="tools">
                <SvgWrap fill={isLiked ? 'point' : 'common'}>
                  <AiFillLike onClick={() => onThumbsUp(comment.id)} />
                </SvgWrap>
                <span>{comment.Likers && (comment.Likers.length) || 0}</span>
                <SvgWrap fill={isDisliked ? 'point' : 'common'}>
                  <AiFillDislike onClick={() => onThumbsDown(comment.id)} />
                </SvgWrap>
                <span>{comment.Dislikers && (comment.Dislikers.length) || 0}</span>
                <SubComment>댓글</SubComment>
              </div>
            </CommentsBox>
          );
        })}
      </CommentsList>
    </PostCommentsWrap>
  );
};

export default PostComments;
