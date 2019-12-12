import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggling } from '../../models/actions/toggle';

const useToggle = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState('');
  const toggleState = useSelector((state) => state.toggle);

  const onToggle = useCallback((type) => {
    dispatch(toggling(type));
  }, [toggleState, dispatch]);

  useEffect(() => {
    setToggle(toggleState);
  }, [toggleState]);

  return [
    toggle,
    onToggle,
  ];
}

export default useToggle;