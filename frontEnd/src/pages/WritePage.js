import React from 'react';
import { Helmet } from 'react-helmet-async';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import PostingButtonsContainer from '../containers/write/PostingButtonsContainer';

const WritePage = () => (
  <Responsive maxWidth="1400">
    <Helmet>
      <title>글 작성하기 - SPACER</title>
    </Helmet>
    <TagBoxContainer />
    <EditorContainer />
    <PostingButtonsContainer />
  </Responsive>
);

export default WritePage;
