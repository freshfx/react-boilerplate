import {rgba, parseToRgb} from 'polished'
import {keyframes} from '@emotion/react'

export const divide = (dividend, divisor) => {
  const [unit] = dividend.match(/[a-zA-Z%]*$/u)
  return `${parseFloat(dividend) / divisor}${unit}`
}

export const addAlpha = (color, alpha) =>
  rgba({
    ...parseToRgb(color),
    alpha
  })

const DEFAULT_OPACITY_FROM = 0
const DEFAULT_OPACITY_TO = 1
export const createOpacityAnimation = (
  from = DEFAULT_OPACITY_FROM,
  to = DEFAULT_OPACITY_TO
) => keyframes`
  from {
    opacity: ${from};
  }
  to {
    opacity: ${to};
  }
`
