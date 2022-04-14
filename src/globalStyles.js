import { createGlobalStyle } from "styled-components/macro";

export const GlobalStyles = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;200;300;400;500;600;700;800;900&family=Outfit:wght@400;700&display=swap');
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html {
    font-size: 16px;
    height: 100%;
  }

  body {
  height: 100%;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: 'Fira Sans', sans-serif;
  font-family: 'Outfit', sans-serif;
}

* {
  margin: 0;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

`;
