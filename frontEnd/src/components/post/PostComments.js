import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  AiFillDislike,
  AiFillLike,
} from 'react-icons/ai';
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css'; // codemirror
import 'highlight.js/styles/github.css'; // code block highlight
import Editor from 'tui-editor';
import { brandingColor } from '../../lib/styles/branding';
import Button from '../common/Button';

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

  .info {
    color: ${brandingColor.common[6]};

    b::after {
      content: '/';
      display: inline-block;
      margin: 0 5px;
      font-size: 13px;
      font-weight: normal;
    }
  }

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
}) => {
  const mounted = useRef(false);
  const instance = useRef(null);

  if (commentError) {
    return (
      <PostCommentsWrap>
        {commentError}
      </PostCommentsWrap>
    );
  }

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
                placeholder="댓글"
                size="mx"
                background="point"
                onClick={(e) => onSubmit(e)}
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
              <div className="info">
                <b>{comment.User.nickname}</b>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
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
