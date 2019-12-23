import React, { useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import tuiStyle from 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import { resetCSS } from './lib/styles/reset';
import Layout from './components/common/Layout';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import ErrorPage from './pages/ErrorPage';
import SearchedPostsPage from './pages/SearchedPostsPage';
import { brandingColor } from './lib/styles/branding';
import ErrorRouterContainer from './containers/common/ErrorRouterContainer';
import NoMatchPage from './components/common/NoMatchPage';
import { overlayToggle } from './models/actions/toggle';

const GlobalStyle = createGlobalStyle`
  ${resetCSS}

  html {
    height: 100%;
    background: ${brandingColor.common[2]};
  }

  body {
    box-sizing: border-box;
    min-height: 100%;
  }

  .tui-editor-contents img {
      border-radius: 15px;
  }

  .tui-style {
    ${tuiStyle}
    .toSomeone {
      color: ${brandingColor.main[6]};
      cursor: pointer;
      font-weight: bold;
    }
  }
`;

const App = () => {
  const dispatch = useDispatch();
  const toggle = useSelector(({ toggle }) => toggle);
  const onOverlayToggle = useCallback((e) => {
    if (e.target.getAttribute('data-this-is-toggle-element')) return;
    dispatch(overlayToggle());
  }, []);

  useEffect(() => { // 글로벌 토글 취소 이벤트 등록, 해제
    if (toggle.activeToggle) {
      document.body.addEventListener('click', onOverlayToggle);
    } else {
      document.body.removeEventListener('click', onOverlayToggle);
    }
  }, [toggle]);

  return (
    <>
      <Helmet>
        <title>SPACER</title>
      </Helmet>
      <Layout>
        <GlobalStyle />
        <Switch>
          <Route component={MainPage} path="/" exact />
          <Route component={ProfilePage} path="/profile/:UserId" />
          <Route component={WritePage} path="/write" />
          <Route component={PostPage} path="/post/:UserId/:PostId" />
          <Route component={SearchedPostsPage} path="/posts/user/:UserId" exact />
          <Route component={SearchedPostsPage} path="/posts/tagged/:TagName" exact />
          <Route component={SearchedPostsPage} path="/posts/liked" />
          <Route component={SearchedPostsPage} path="/posts/search" exact />
          <Route component={ErrorPage} path="/error" exact />
          <Route component={NoMatchPage} path="*" />
        </Switch>
        <ErrorRouterContainer />
      </Layout>
    </>
  );
};

export default App;
