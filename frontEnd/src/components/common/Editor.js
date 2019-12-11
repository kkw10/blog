import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// TUI editors...
import Editor from 'tui-editor';
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css'; // codemirror
import 'highlight.js/styles/github.css'; // code block highlight


// Component...
import Button from './Button';

const PostSubCommentEditorWrap = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;

  &::after {
    content: '';
    display: block;
    clear: both;
  }

  .buttons {
    margin-top: 1rem;
    float: right;

    button + button {
      margin-left: 0.5rem;
    }
  }
`;

const DefaultEditor = ({
  type,
  visible,
  editorName,
  toSomeone,
  prevData,
  submitHolder,
  cancelHolder,
  submitEvent,
  cancelEvent,
  onChangeField,
  fieldKey,
}) => {
  if (!visible) return null;

  const instance = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!editorName) return;

    if (!mounted.current) {
      mounted.current = true;
      instance.current = new Editor({
        el: document.querySelector(`#${editorName}`),
        initialEditType: 'wysiwyg',
        previewStyle: 'vertical',
        height: '200px',
        placeholder: '내용',
      });

      if (prevData) {
        instance.current.setValue(prevData.contents);
      }

      if (type === 'SUB' && toSomeone) {
        instance.current.setValue(`<b class="toSomeone" dataId="${toSomeone.id}">@${toSomeone.nickname}</b>&nbsp;`);
      }

      instance.current.on('change', () => {
        const data = instance.current.getHtml();
        onChangeField({
          key: fieldKey,
          value: data,
        });
      });
    }
  }, [prevData]);

  return (
    <PostSubCommentEditorWrap>
      <div id={editorName} className="tui-style" />
      <div className="buttons">
        <Button
          background="point"
          size="md"
          placeholder={submitHolder}
          onClick={submitEvent}
        />
        <Button
          size="md"
          placeholder={cancelHolder}
          onClick={cancelEvent}
        />
      </div>
    </PostSubCommentEditorWrap>
  )
};

export default DefaultEditor;
