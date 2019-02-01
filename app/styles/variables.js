/* eslint-disable no-magic-numbers, max-lines */

import {css} from 'styled-components'
import {
  rgba,
  lighten,
  darken,
  stripUnit,
  rem,
  em
} from 'polished'
import {
  addAlpha
} from './utils'

// Colors

// Grayscale and brand colors for use across Bootstrap.

export const BLACK = '#000'
export const WHITE = '#fff'

// Start with assigning color names to specific hex values.
export const RED = '#E40A43'
export const GREEN = '#04C362'
export const YELLOW = '#FFE666'
export const BLUE = '#0A86CB'
export const ORANGE = '#F2940A'

// Lighter Colors
export const RED_LIGHT = lighten(0.5, RED)
export const BLUE_LIGHT = lighten(0.5, BLUE)
export const ORANGE_LIGHT = lighten(0.5, ORANGE)
export const YELLOW_LIGHT = lighten(0.5, YELLOW)

// Darker Colors
export const BLUE_DARK = darken(0.25, BLUE)
export const RED_DARK = '#b30835'
export const RED_SEMI_DARK = '#db0a40'

// Reassign color vars to semantic color scheme
export const BRAND_PRIMARY = YELLOW
export const BRAND_DANGER = RED
export const GRAY_DARKEST = '#222'
export const GRAY_DARK = '#4E4E4E'
export const GRAY = '#646567'
export const GRAY_LIGHT = '#CCCCCC'
export const GRAY_LIGHTER = '#DCDCDC'
export const GRAY_LIGHTEST = '#F6F6F6'
export const CMS_YELLOW = '#FFE46D'
export const CMS_ORANGE = '#FFDE28'


// Body

// Settings for the `<body>` element.

export const BODY_BG = WHITE
export const BODY_COLOR = GRAY_DARKEST


// Components

// Define common padding and border radius sizes and more.

export const LINE_HEIGHT_LG = 1.5
export const LINE_HEIGHT_SM = 1.5

export const BORDER_WIDTH = '1px'
export const BORDER_RADIUS = '.25rem'
export const BORDER_RADIUS_LG = '.3rem'
export const BORDER_RADIUS_SM = '.2rem'

// Links

// Style anchor elements.

export const LINK_COLOR = BODY_COLOR
export const LINK_HIGHLIGHT_COLOR = BLUE
export const LINK_DECORATION = 'none'
export const LINK_HOVER_COLOR = BLUE
export const LINK_HIGHLIGHT_HOVER_COLOR = RED
export const LINK_HOVER_DECORATION = 'none'

// Media Queries

/* eslint-disable sort-keys */
export const sizes = {
  phone: 576,
  tablet: 768,
  desktop: 992,
  largeDesktop: 1200
}
/* eslint-enable sort-keys */

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `

  return acc
}, {})

const orientations = ['portrait', 'landscape']
export const mediaOrientations = orientations.reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (orientation: ${label}) {
      ${css(...args)}
    }
  `

  return acc
}, {})

const aspectRatios = {
  '16to9': '16/9',
  '1to2': '1/2',
  '4to3': '4/3'
}
export const mediaAspectRatios = Object.keys(aspectRatios).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-aspect-ratio: ${aspectRatios[label]}) {
      ${css(...args)}
    }
  `
  return acc
}, {})

// Grid containers

/* eslint-disable sort-keys */
export const containerWidths = {
  phone: 540,
  tablet: 720,
  desktop: 960,
  largeDesktop: 1140
}
/* eslint-enable sort-keys */

// Space

// Base padding and margin values

export const SPACE_BASE_PADDING = '1rem'
export const SPACE_BASE_MARGIN = '1rem'

export const SPACE_SITE_PADDING = '1.5rem'


// Fonts

// Font, line-height, and color for body text, headings, and more.

export const FONT_FAMILY_SANS_SERIF = '"OPEN SANS", HELVETICA, ARIAL, SANS_SERIF'
export const FONT_FAMILY_BASE = FONT_FAMILY_SANS_SERIF

export const FONT_SIZE_MOBILE = '13px'
export const FONT_SIZE_BASE = '16px'
export const FONT_SIZE_SMALL = rem('12px', FONT_SIZE_BASE)
export const FONT_SIZE_BASE_UNITLESS = stripUnit(FONT_SIZE_BASE)

export const LINE_HEIGHT_BASE = 18 / FONT_SIZE_BASE_UNITLESS

export const FONT_SIZE_H1 = rem('16px', FONT_SIZE_BASE)
export const FONT_SIZE_H2 = rem('15px', FONT_SIZE_BASE)
export const FONT_SIZE_H3 = rem('14px', FONT_SIZE_BASE)
export const FONT_SIZE_H4 = rem('13px', FONT_SIZE_BASE)
export const FONT_SIZE_H5 = rem('12px', FONT_SIZE_BASE)
export const FONT_SIZE_H6 = rem('12px', FONT_SIZE_BASE)

export const FONT_WEIGHT_LIGHTER = 'lighter'
export const FONT_WEIGHT_LIGHT = 300
export const FONT_WEIGHT_NORMAL = 400
export const FONT_WEIGHT_BOLD = 700
export const FONT_WEIGHT_BOLDER = 'bolder'

export const FONT_WEIGHT_BASE = FONT_WEIGHT_NORMAL

export const FONT_SIZE_H1_PX = stripUnit(FONT_SIZE_H1) * FONT_SIZE_BASE_UNITLESS

export const LINE_HEIGHT_H1 = em('23px', FONT_SIZE_H1_PX)

export const HEADINGS_COLOR = BLACK

// Forms
export const FORM_BG = BODY_BG
export const FORM_BG_DARKER = '#1D1D1D'
export const INPUT_COLOR = GRAY
export const INPUT_COLOR_FOCUS = INPUT_COLOR
export const INPUT_BG = GRAY_LIGHTEST
export const INPUT_BOX_SHADOW = `inset 0 1px 1px ${addAlpha(BLACK, 0.075)}`
export const INPUT_BG_FOCUS = INPUT_BG
export const INPUT_BORDER_COLOR = lighten(0.85, BLACK)
export const INPUT_BORDER_COLOR_FOCUS = lighten(0.25, GRAY)
export const INPUT_BOX_SHADOW_FOCUS = `${INPUT_BOX_SHADOW}, ${addAlpha(INPUT_BORDER_COLOR_FOCUS, 0.6)}`
export const INPUT_BORDER_FOCUS = addAlpha(BLACK, 0.15)
export const INPUT_COLOR_PLACEHOLDER = GRAY_LIGHT
export const INPUT_BTN_BORDER_WIDTH = BORDER_WIDTH
export const INPUT_BORDER_RADIUS = BORDER_RADIUS
export const CHECKBOX_PADDING_LEFT = `${20 / 16}rem`

// Buttons

// For each of Bootstrap's buttons, define text, background and border color.

export const INPUT_BTN_PADDING_Y = '.5rem'
export const INPUT_BTN_PADDING_X = '1rem'
export const INPUT_BTN_LINE_HEIGHT = LINE_HEIGHT_BASE

export const INPUT_BTN_PADDING_Y_SM = '.25rem'
export const INPUT_BTN_PADDING_X_SM = '.5rem'
export const INPUT_BTN_LINE_HEIGHT_SM = 1.5

export const INPUT_BTN_PADDING_Y_LG = '.5rem'
export const INPUT_BTN_PADDING_X_LG = '1rem'
export const INPUT_BTN_LINE_HEIGHT_LG = 1.5

export const BTN_BORDER_WIDTH = INPUT_BTN_BORDER_WIDTH
export const BTN_FONT_WEIGHT = FONT_WEIGHT_BASE

export const BTN_LINE_HEIGHT = INPUT_BTN_LINE_HEIGHT
export const BTN_PADDING_Y = INPUT_BTN_PADDING_Y
export const BTN_PADDING_X = INPUT_BTN_PADDING_X
export const BTN_BORDER_RADIUS = BORDER_RADIUS
export const BTN_TRANSITION = [
  'color .15s ease-in-out',
  'background-color .15s ease-in-out',
  'border-color .15s ease-in-out',
  'box-shadow .15s ease-in-out'
].join()

export const BTN_DISABLED_OPACITY = 0.65

export const BTN_PRIMARY_COLOR = WHITE
export const BTN_PRIMARY_BG = RED
export const BTN_PRIMARY_BORDER = RED

export const BTN_DEFAULT_COLOR = GRAY_DARKEST
export const BTN_DEFAULT_BG = GRAY_LIGHTEST
export const BTN_DEFAULT_BORDER = GRAY_LIGHTEST

export const BTN_SECONDARY_COLOR = BLACK
export const BTN_SECONDARY_BG = GRAY_LIGHTEST
export const BTN_SECONDARY_BORDER = rgba(204, 204, 204, 0.5)

export const BTN_DANGER_COLOR = WHITE
export const BTN_DANGER_BG = BRAND_DANGER
export const BTN_DANGER_BORDER = BTN_DANGER_BG

export const BTN_FLAT_COLOR = GRAY_LIGHTEST
export const BTN_FLAT_BG = rgba(0, 0, 0, 0)
export const BTN_FLAT_BORDER = rgba(0, 0, 0, 0)
export const BTN_FLAT_COLOR_HOVER = RED

// Header
export const HEADER_BG_OPAQUE = BLACK
export const HEADER_BG = addAlpha(BLACK, 0.7)

// Searchbar
export const INPUT_SEARCH_COLOR = addAlpha(WHITE, 0.75)
export const INPUT_SEARCH_BG = 'transparent'
export const INPUT_SEARCH_BORDER_COLOR = addAlpha(WHITE, 0.25)
export const SEARCHBAR_NAVBAR_MAX_WIDTH = '741px'

// Navigationbar
export const NAVIGATIONBAR_COLOR = addAlpha(WHITE, 0.5)
export const NAVIGATIONBAR_BORDER_COLOR = addAlpha(WHITE, 0.1)

// Navs

export const NAV_TABS_BORDER_COLOR = '#D9D9D9'
export const NAV_TABS_ACTIVE_LINK_HOVER_BG = GRAY_LIGHTEST
export const NAV_TABS_LINK_HOVER_BORDER_COLOR = 'NONE'

export const SIDEBAR_MIN_WIDTH = '300px'
export const SIDEBAR_MAX_WIDTH = '400px'

export const STATE_COLORS = {
  archived: GRAY,
  draft: ORANGE,
  error: RED,
  scheduled: lighten(0.25, BLUE),
  sending: BLUE_DARK,
  sent: BLUE
}

export const OPT_IN_STATE_COLORS = {
  pending: ORANGE,
  renounced: RED,
  valid: BLUE
}

const toRem = (value, base) => value.split(' ')
  .map(it => {
    if (it === '0') {
      return it
    }
    return rem(it, base)
  })
  .join(' ')

const mapRulesString = rulesString => rulesString.split(';')
  .filter(ruleString => ruleString.trim().length > 0)
  .reduce((acc, ruleString) => {
    const [property, value] = ruleString.split(':').map(it => it.trim())
    return {
      ...acc,
      [property]: value
    }
  }, {})

export const mediaSize = (...args) => {
  const [[rulesString = ''] = []] = args

  const rules = mapRulesString(rulesString)

  const reduce = (acc, property, base) =>
    `${acc} ${property}: ${toRem(rules[property], base)};`

  return Object.keys(rules)
    .reduce((acc, property) => reduce(acc, property, FONT_SIZE_BASE), '')
}
