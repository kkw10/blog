import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route } from 'react-router-dom';
import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage';
import { resetCSS } from './lib/styles/reset';
import Layout from './components/common/Layout';

const GlobalStyle = createGlobalStyle`
  ${resetCSS}

  html {
    height: 100%;
  }

  body {
    box-sizing: border-box;
    min-height: 100%;
  }
`;

const App = () => (
  <Layout>
    <GlobalStyle />
    <Route component={PostPage} path="/" exact />
    <Route component={AboutPage} path="/about" />
  </Layout>
);

export default App;
