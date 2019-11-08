import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialize, changeField } from '../../models/actions/write';
import Editor from '../../components/write/Editor';

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { title, contents } = useSelector(({ write }) => ({
    title: write.title,
    contents: write.contents,
  }));

  const onChangeField = useCallback((payload) => (
    dispatch(changeField(payload))
  ), [dispatch]);

  useEffect(() => { // ?
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <Editor
      title={title}
      contents={contents}
      onChangeField={onChangeField}
    />
  );
};

export default EditorContainer;
