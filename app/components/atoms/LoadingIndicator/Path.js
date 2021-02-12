import styled from '@emotion/styled'
import {keyframes} from '@emotion/react'

import {BRAND_PRIMARY} from 'styles/variables'

import {DURATION} from './Spinner'

const HALF = 0.5
const QUARTER = 0.25
const OFFSET_FACTOR = 3.25

const getOffset = (size, lineWidth) => {
  const halfWidth = lineWidth * HALF
  const innerDiameter = size - halfWidth
  return innerDiameter * OFFSET_FACTOR
}

const getDashArray = ({size, lineWidth}) => getOffset(size, lineWidth)

const getDashAnimation = ({size, lineWidth}) => {
  const offset = getOffset(size, lineWidth)
  return keyframes`
    0% {
      stroke-dashoffset: ${offset};
    }
    50% {
      stroke-dashoffset: ${offset * QUARTER};
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: ${offset};
      transform: rotate(450deg);
    }
  `
}

const Path = styled.circle`
  stroke-dasharray: ${getDashArray};
  stroke-dashoffset: 0;
  stroke: ${BRAND_PRIMARY};
  transform-origin: center;
  animation: ${getDashAnimation} ${DURATION}s ease-in-out infinite;
`

export default Path
