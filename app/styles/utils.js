import {
  rgba,
  parseToRgb
} from 'polished'

export const divide = (dividend, divisor) => {
  const [unit] = dividend.match(/[a-zA-Z%]*$/)
  return `${parseFloat(dividend) / divisor}${unit}`
}

export const addAlpha = (color, alpha) => rgba({
  ...parseToRgb(color),
  alpha
})
