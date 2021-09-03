import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: "BCSans", "Noto Sans", Verdana, Arial, sans-serif;
  }

  body {
    margin: 0;
  }

  html, body {
    height: 100%;
  }
`;

export default GlobalStyles;
