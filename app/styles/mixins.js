/* eslint-disable no-magic-numbers, capitalized-comments */
/* stylelint-disable property-no-vendor-prefix */
import {css} from '@emotion/core'
import {
  media,
  containerWidths,
  LINK_HOVER_COLOR,
  LINK_HIGHLIGHT_HOVER_COLOR,
  LINK_HIGHLIGHT_COLOR,
  LINK_COLOR,
  LINK_DECORATION,
  LINK_HOVER_DECORATION,
  SEARCHBAR_NAVBAR_MAX_WIDTH,
  WHITE,
  BLUE
} from './variables'

export const container = css`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  ${media.phone`width: ${containerWidths.phone}px;`}
  ${media.tablet`width: ${containerWidths.tablet}px;`}
  ${media.desktop`width: ${containerWidths.desktop}px;`}
  ${media.largeDesktop`width: ${containerWidths.largeDesktop}px;`}
`

export const cmsContainer = css`
  margin-left: auto;
  margin-right: auto;
  width: ${containerWidths.desktop - 250}px;
  ${media.largeDesktop`width: ${containerWidths.largeDesktop - 250}px;`}
`

export const smallerContainer = css`
  ${container}
  max-width: ${SEARCHBAR_NAVBAR_MAX_WIDTH};
`

const getColor = ({highlight = false}) => {
  if (highlight) {
    return LINK_HIGHLIGHT_COLOR
  }
  return LINK_COLOR
}

const getHoverColor = ({highlight = false}) => {
  if (highlight) {
    return LINK_HIGHLIGHT_HOVER_COLOR
  }
  return LINK_HOVER_COLOR
}

export const link = css`
  color: ${getColor};
  text-decoration: ${LINK_DECORATION};

  &:hover {
    color: ${getHoverColor};
    text-decoration: ${LINK_HOVER_DECORATION};
  }
`

export const ellipsis = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const input = css`
  position: relative;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${WHITE};
  background-color: transparent;
  border: none;
  padding: 0;
  border-radius: 0;
  transition: color 0.4s ease, border-color 0.4s ease, background-color 0.4s ease;
  -webkit-appearance: none;
  -webkit-font-smoothing: antialiased;

  &:focus {
    outline: none;
    color: ${BLUE};
  }
`
