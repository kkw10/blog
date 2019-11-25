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

`;

const Form = styled.form`
  background: #fff;
  margin-bottom: 2rem;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 2rem;
  border-top: 1px solid ${brandingColor.common[2]};
  padding-top: 2rem;

  .tui-editor-defaultUI {
    border-radius: 5px;
  }

  .tui-editor-defaultUI-toolbar {
    border-radius: 5px 5px 0 0;
    background: ${brandingColor.common[0]};
  }

  .te-ww-container {
    border-radius: 0 0 5px 5px;
  }

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
    font-size: 13px;
    color: ${brandingColor.common[6]};
    b::after {
      content: '/';
      display: inline-block;
      margin: 0 5px;
      font-weight: normal;
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
  onThumbsUp,
  onThumbsDown,
  onDeleteComment,
  onRefresh,
}) => {
  const dispatch = useDispatch();
  const toggle = useSelector(({ toggle }) => (toggle));
  const mounted = useRef(false);
  const instance = useRef(null);
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

  useEffect(() => {
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
                  <b>{comment.User.nickname}</b>
                  <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="more">
                  <IoIosMore
                    onClick={() => commentMoreToggle(comment.id)}
                  />
                  <DropBox
                    visible={toggle.activeToggle === `commentMore-${comment.id}`}
                    top="20px"
                  >
                    <MoreBox>
                      <li>수정</li>
                      <li onClick={() => onDeleteComment(comment.id)}>삭제</li>
                    </MoreBox>
                  </DropBox>
                </div>
              </Head>
              <div
                className="text tui-style tui-editor-contents"
                dangerouslySetInnerHTML={{ __html: comment.contents }}
              />
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
