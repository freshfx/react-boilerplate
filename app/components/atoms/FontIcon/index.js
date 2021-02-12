import styled from '@emotion/styled'

import {BASE, ICONS} from './icons'

const STRING_BASE = 16
const INDEX_INCREASE = 1

const toStyleObject = (data, index) => ({
  key: data,
  value: {
    '&:before': {
      content: `"\\f${(
        parseInt(BASE, STRING_BASE) +
        index +
        INDEX_INCREASE
      ).toString(STRING_BASE)}"`
    }
  }
})

const iconMap = ICONS.reduce((prev, curr, index) => {
  const style = toStyleObject(curr, index)
  const newValue = {...prev[style.key], ...style.value}
  return Object.assign(prev, {
    [style.key]: newValue
  })
}, {})

const fixedWidth = `
  width: 1.65em;
  text-align: center;
`

const flippedIcon = `
  transform: scaleX(-1);
`

const FontIconWrapper = styled.span`
  font-family: 'icons' !important;
  display: inline-block;
  speak: none;
  font-size: inherit;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  ${props => iconMap[props.name]}
  ${props => props.fixedWidth && fixedWidth}
  ${props => props.flipped && flippedIcon}
`

export default FontIconWrapper
