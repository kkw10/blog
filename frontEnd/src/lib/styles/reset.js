import styled, { css } from 'styled-components';

export const resetCSS = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    vertical-align: middle;
  }
`