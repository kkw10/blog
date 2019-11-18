import React, { useEffect } from 'react';
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
      color: ${brandingColor.common[4]};
      cursor: pointer;
      margin-right: 0.5rem;
    }
  }
`;

const SubComment = styled.div`
  color: ${brandingColor.common[4]};
`;

const PostComments = ({
  user,
}) => {
  useEffect(() => {
    if (!user) return;

    const instance = new Editor({
      el: document.querySelector('#tui_editor'),
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      height: '200px',
      placeholder: '내용',
    });
  }, [user]);

  return (
    <PostCommentsWrap>
      {user && (
        <>
          <Form>
            <div id="tui_editor" />
            <div className="button">
              <Button
                placeholder="댓글"
                size="lg"
                background="point"
              />
            </div>
          </Form>
        </>
      )}
      <CommentsList>
        <CommentsBox>
          <div className="info">
            <b>TESTER1</b>
            <span>2019. 11. 14.</span>
          </div>
          <div className="text">
            1등입니다.
          </div>
          <div className="tools">
            <AiFillLike />
            <AiFillDislike />
            <SubComment>댓글</SubComment>
          </div>
        </CommentsBox>
        <CommentsBox>
          <div className="info">
            <b>TESTER1</b>
            <span>2019. 11. 14.</span>
          </div>
          <div className="text">
            2등입니다.
          </div>
          <div className="tools">
            <AiFillLike />
            <AiFillDislike />
            <SubComment>댓글</SubComment>
          </div>
        </CommentsBox>
        <CommentsBox>
          <div className="info">
            <b>TESTER1</b>
            <span>2019. 11. 14.</span>
          </div>
          <div className="text">
            3등입니다.
          </div>
          <div className="tools">
            <AiFillLike />
            <AiFillDislike />
            <SubComment>댓글</SubComment>
          </div>
        </CommentsBox>
      </CommentsList>
    </PostCommentsWrap>
  )
};

export default PostComments;
