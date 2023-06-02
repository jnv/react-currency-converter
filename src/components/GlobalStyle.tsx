import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: sans-serif;
    line-height: 1.5;
  }

  body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default GlobalStyle;
