import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// actions...
import { changeField } from '../../models/actions/write';

// Component...
import Editor from '../../components/common/Editor';

const EditorContainer = ({
  type,
  visible,
  editorName,
  toSomeone,
  prevData,
  submitHolder,
  cancelHolder,
  submitEvent,
  cancelEvent,
  fieldKey,
}) => {
  const dispatch = useDispatch();

  const onChangeField = useCallback((payload) => {
    dispatch(changeField(payload));
  }, [dispatch]);

  return (
    <Editor
      type={type}
      visible={visible}
      editorName={editorName}
      toSomeone={toSomeone}
      prevData={prevData}
      submitHolder={submitHolder}
      cancelHolder={cancelHolder}
      submitEvent={submitEvent}
      cancelEvent={cancelEvent}
      onChangeField={onChangeField}
      fieldKey={fieldKey}
    />
  );
};

export default EditorContainer;
