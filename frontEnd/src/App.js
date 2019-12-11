import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route } from 'react-router-dom';
import tuiStyle from 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import { resetCSS } from './lib/styles/reset';
import Layout from './components/common/Layout';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import SearchedPostsPage from './pages/SearchedPostsPage';
import { brandingColor } from './lib/styles/branding';

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

const App = () => (
  <Layout>
    <GlobalStyle />
    <Route component={MainPage} path="/" exact />
    <Route component={ProfilePage} path="/profile/:UserId" />
    <Route component={WritePage} path="/write" />
    <Route component={PostPage} path="/post/:UserId/:PostId" />
    <Route component={SearchedPostsPage} path="/posts/:UserId" exact />
    <Route component={SearchedPostsPage} path="/posts/tagged/:TagName" exact />
  </Layout>
);

export default App;
