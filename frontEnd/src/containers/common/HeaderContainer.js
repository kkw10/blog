import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { toggling } from '../../models/actions/toggle';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.toggle);
  const user = useSelector(({ user }) => (user.user));

  const onToggling = (type) => {
    dispatch(toggling(type));
  };

  return (
    <Header
      toggle={toggle}
      onToggling={onToggling}
      user={user}
    />
  );
};

export default HeaderContainer;
