import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route } from 'react-router-dom';
import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-height: 100%;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: inherit;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Route component={PostPage} path='/' exact />
      <Route component={AboutPage} path="/about" />
    </>
  );
};

export default App;