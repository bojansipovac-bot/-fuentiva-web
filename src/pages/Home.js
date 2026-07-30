import React from 'react';

const styles = {
  '@import': 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap',
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #080808;
    --gray1: #111111;
    --gray2: #1C1C1C;
    --gray3: #2E2E2E;
    --muted: #6B6B6B;
    --light: #A0A0A0;
    --white: #F2F2F0;
    --orange: #FF5500;
    --orange2: #FF7733;
    --oglow: rgba(255, 85, 0, 0.10);
  }

  body {
    background: var(--black);
    color: var(--white);
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 68px;
    background: rgba(8,8,8,0.88);
