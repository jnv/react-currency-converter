import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: system-ui, sans-serif;
    line-height: 1.5;
  }

  body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (prefers-color-scheme:dark) {
    a:link {
     color:#9e9eff
    }
    a:visited {
     color:#d0adf0
    }
    a:active {
     color:red
    }
   }
`;

export default GlobalStyle;
