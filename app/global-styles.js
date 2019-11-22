import {css} from '@emotion/core'
import {
  media,
  BODY_BG,
  BODY_COLOR,
  FONT_SIZE_BASE,
  FONT_SIZE_MOBILE
} from 'styles/variables'

const GlobalStyles = css`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: ${BODY_BG};
    color: ${BODY_COLOR};
    font-size: ${FONT_SIZE_MOBILE};
    ${media.tablet`
      font-size: ${FONT_SIZE_BASE};
    `}
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    overflow-x: hidden;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
    display: flex;
  }

  .grecaptcha-badge {
    z-index: 1;
  }
`

export default GlobalStyles
