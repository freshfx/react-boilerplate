import styled from '@emotion/styled'

const Wrapper = styled.li`
  width: 100%;
  height: 3em;
  display: flex;
  align-items: center;
  position: relative;
  border-top: 1px solid #eee;

  &:first-of-type {
    border-top: none;
  }
`

export default Wrapper
