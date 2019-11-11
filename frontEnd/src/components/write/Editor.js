import React, { useEffect } from 'react';
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css'; // codemirror
import 'highlight.js/styles/github.css'; // code block highlight
import Editor from 'tui-editor';
import styled from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';

const WriteEditorWrap = styled.div`
  margin-top: 1rem;
  background: #fff;
  border-radius: 5px;
  padding: 1rem;
  padding-bottom: 4rem;

  #tui_editor {
    border-radius: 5px;
    border: 1px solid ${brandingColor.common[3]};
  }

  .tui-editor-defaultUI {
    border: none;
  }

  .te-toolbar-section {
    border-bottom: none;
  }

  .tui-editor-defaultUI-toolbar {
    border-radius: 5px 5px 0 0;
    background: ${brandingColor.common[0]};
  }

  .tui-editor-defaultUI-toolbar button {
    background-color: transparent;
    border: none;
  }

  .te-ww-container {
    border-radius: 0 0 5px 5px;
  }

  .te-preview {
    background: ${brandingColor.point[0]}
  }

  .tui-editor-defaultUI .te-mode-switch-section {
    margin-top: 0.5rem;
    background: none;
    border: none;
  }

  .te-switch-button {
    
  }

  .te-switch-button.markdown {
    border-radius: 5px;
    margin-right: 0.5rem;
    padding: 0;
    height: 30px;
    font-weight: bold;
    border: 1px solid ${brandingColor.point[5]};
    background: #fff;

    &.active {
      background: ${brandingColor.point[5]};
      color: #fff;      
    }
  }

  .te-switch-button.wysiwyg {
    border-radius: 5px;
    padding: 0;
    height: 30px;
    font-weight: bold;
    border: 1px solid ${brandingColor.point[5]};
    background: #fff;

    &.active {
      background: ${brandingColor.point[5]};
      color: #fff;
    }
  }

  .tui-editor-defaultUI .te-mode-switch-section {
    height: auto;
    position: absolute;
    right: 0;
    bottom: -3rem;
  }
`;

const TitleInput = styled.input`
  border: 1px solid ${brandingColor.common[3]};
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 100%;
  height: 50px;
  font-weight: bold;
  padding: 0 1rem;
  color: ${brandingColor.common[5]};
  font-size: 22px;

  &::placeholder {
    color: ${brandingColor.common[5]};
    font-size: 22px;
  }
`;

const WriteEditor = ({
  title,
  onChangeField,
}) => {
  useEffect(() => {
    const instance = new Editor({
      el: document.querySelector('#tui_editor'),
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      height: '500px',
      placeholder: '내용',
    });

    instance.on('change', () => {
      const data = instance.getHtml();
      onChangeField({
        key: 'contents',
        value: data,
      });
    });
  }, [onChangeField]);

  const onChangeTitle = (e) => {
    onChangeField({
      key: 'title',
      value: e.target.value,
    });
  };

  return (
    <WriteEditorWrap>
      <TitleInput
        placeholder="제목"
        value={title}
        onChange={onChangeTitle}
      />
      <div id="tui_editor" />
    </WriteEditorWrap>
  );
};

export default WriteEditor;
