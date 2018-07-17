/* eslint-disable no-magic-numbers */

import {
  rgba,
  lighten,
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
export const RED_LIGHT = '#FDF3F5'
export const GREEN = '#04C362'
export const YELLOW = '#FFE666'
export const BLUE = '#0A86CB'
export const BLUE_DARK = '#0A3064'
export const BLUE_LIGHT = '#F2FAFD'
export const ORANGE = '#F2940A'
export const ORANGE_LIGHT = '#FEF9F3'
export const LIGHTYELLOW = '#FFFAE2'

// Reassign color vars to semantic color scheme
export const BRAND_PRIMARY = '#FFE666'
export const BRAND_DANGER = RED
export const GRAY_DARK = '#4E4E4E'
export const GRAY = '#646567'
export const GRAY_LIGHT = '#CCCCCC'
export const GRAY_LIGHTER = '#DCDCDC'
export const GRAY_LIGHTEST = '#F6F6F6'


// Body

// Settings for the `<body>` element.

export const BODY_BG = GRAY_LIGHTEST
export const BODY_COLOR = GRAY_DARK


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
export const LINK_HOVER_COLOR = BLACK
export const LINK_HOVER_DECORATION = 'NONE'


// Grid columns

// Set the number of columns and specify the width of the gutters.

export const GRID_COLUMNS = 12
export const GRID_GUTTER_WIDTH_BASE = '30px'

// Space

// Base padding and margin values

export const SPACE_BASE_PADDING = '1rem'
export const SPACE_BASE_MARGIN = '1rem'

export const SPACE_SITE_PADDING = '1.5rem'


// Fonts

// Font, line-height, and color for body text, headings, and more.

export const FONT_FAMILY_SANS_SERIF = '"OPEN SANS", HELVETICA, ARIAL, SANS_SERIF'
export const FONT_FAMILY_BASE = FONT_FAMILY_SANS_SERIF

export const FONT_SIZE_BASE = '12px'
export const FONT_SIZE_SMALL = rem('10px', FONT_SIZE_BASE)
export const FONT_SIZE_BASE_UNITLESS = stripUnit(FONT_SIZE_BASE)

export const LINE_HEIGHT_BASE = 18 / FONT_SIZE_BASE_UNITLESS

export const FONT_SIZE_H1 = rem('16px', FONT_SIZE_BASE)
export const FONT_SIZE_H2 = rem('15px', FONT_SIZE_BASE)
export const FONT_SIZE_H3 = rem('14px', FONT_SIZE_BASE)
export const FONT_SIZE_H4 = rem('13px', FONT_SIZE_BASE)
export const FONT_SIZE_H5 = rem('12px', FONT_SIZE_BASE)
export const FONT_SIZE_H6 = rem('12px', FONT_SIZE_BASE)

export const FONT_SIZE_H1_PX = stripUnit(FONT_SIZE_H1) * FONT_SIZE_BASE_UNITLESS

export const LINE_HEIGHT_H1 = em('23px', FONT_SIZE_H1_PX)

export const HEADINGS_COLOR = BLACK


// Buttons

// For each of Bootstrap's buttons, define text, background and border color.

export const INPUT_BTN_PADDING_Y = '.5rem'
export const INPUT_BTN_PADDING_X = '1rem'
export const INPUT_BTN_LINE_HEIGHT = 1.25

export const INPUT_BTN_PADDING_Y_SM = '.25rem'
export const INPUT_BTN_PADDING_X_SM = '.5rem'
export const INPUT_BTN_LINE_HEIGHT_SM = 1.5

export const INPUT_BTN_PADDING_Y_LG = '.5rem'
export const INPUT_BTN_PADDING_X_LG = '1rem'
export const INPUT_BTN_LINE_HEIGHT_LG = 1.5

export const BTN_LINE_HEIGHT = 18 / FONT_SIZE_BASE_UNITLESS
export const BTN_PADDING_Y = `${5 / FONT_SIZE_BASE_UNITLESS}rem`

export const BTN_PRIMARY_COLOR = BLACK
export const BTN_PRIMARY_BG = BRAND_PRIMARY
export const BTN_PRIMARY_BORDER = addAlpha(BLACK, 0.1)

export const BTN_SECONDARY_COLOR = BLACK
export const BTN_SECONDARY_BG = GRAY_LIGHTEST
export const BTN_SECONDARY_BORDER = rgba(204, 204, 204, 0.5)

export const BTN_DANGER_COLOR = WHITE
export const BTN_DANGER_BG = BRAND_DANGER
export const BTN_DANGER_BORDER = BTN_DANGER_BG

// Forms
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
