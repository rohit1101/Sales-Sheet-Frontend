import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html {
    font-size: 1.125rem;
    height: 100%;
  }

  body {
height: 100%;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

* {
  margin: 0;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

`;
