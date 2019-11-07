import React from 'react';
import Responsive from '../components/common/Responsive';
import WriteEditor from '../components/write/Editor';
import TagBox from '../components/write/TagBox';
import PostingButtons from '../components/write/PostingButtons';

const WritePage = () => (
  <Responsive maxWidth="1200">
    <TagBox />
    <WriteEditor />
    <PostingButtons />
  </Responsive>
);

export default WritePage;
