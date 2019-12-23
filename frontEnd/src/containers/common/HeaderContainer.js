import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../models/actions/user';
import useToggle from '../../lib/hooks/toggleHook';

const HeaderContainer = ({ history }) => {
  const dispatch = useDispatch();
  const [toggle, onToggle] = useToggle();
  const user = useSelector(({ user }) => (user.user));

  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <Header
      toggle={toggle}
      onToggle={onToggle}
      onLogout={onLogout}
      user={user}
    />
  );
};

export default withRouter(HeaderContainer);
