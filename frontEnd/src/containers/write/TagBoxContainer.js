import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField } from '../../models/actions/write';
import TagBox from '../../components/write/TagBox';

const TagBpxContainer = () => {
  const dispatch = useDispatch();
  const hashTags = useSelector(({ write }) => write.hashTags);

  const onChangeTags = (newTags) => {
    dispatch(changeField({
      key: 'hashTags',
      value: newTags,
    }));
  };

  return (
    <TagBox
      hashTags={hashTags}
      onChangeTags={onChangeTags}
    />
  );
};

export default TagBpxContainer;
