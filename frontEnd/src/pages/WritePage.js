import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import PostingButtonsContainer from '../containers/write/PostingButtonsContainer';

const WritePage = () => (
  <Responsive maxWidth="1400">
    <TagBoxContainer />
    <EditorContainer />
    <PostingButtonsContainer />
  </Responsive>
);

export default WritePage;
