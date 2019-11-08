import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import PostingButtons from '../components/write/PostingButtons';

const WritePage = () => (
  <Responsive maxWidth="1200">
    <TagBoxContainer />
    <EditorContainer />
    <PostingButtons />
  </Responsive>
);

export default WritePage;
