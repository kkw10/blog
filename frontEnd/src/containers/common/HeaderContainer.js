import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { toggling } from '../../models/actions/toggle';
import { logout } from '../../models/actions/user';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.toggle);
  const user = useSelector(({ user }) => (user.user));

  const onToggling = (type) => {
    dispatch(toggling(type));
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Header
      toggle={toggle}
      onToggling={onToggling}
      onLogout={onLogout}
      user={user}
    />
  );
};

export default HeaderContainer;
