import styled from '@emotion/styled'
import {keyframes} from '@emotion/react'

const rotation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
`

const DURATION = 1.4
const Spinner = styled.svg`
  animation: ${rotation} ${DURATION}s linear infinite;

  ul & {
    display: block;
    margin: 2rem auto;
  }
`

export {DURATION}

export default Spinner
