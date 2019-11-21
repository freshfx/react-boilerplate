import React, {Children} from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import Anchor from './Anchor'
import StyledButton from './StyledButton'
import Wrapper from './Wrapper'

function Button(props) {
  // Render an anchor tag
  let button = (
    <Anchor href={props.href} onClick={props.onClick}>
      {Children.toArray(props.children)}
    </Anchor>
  )

  // If the Button has a handleRoute prop, we want to render a button
  if (props.handleRoute) {
    button =
      <StyledButton onClick={props.handleRoute}>
        {Children.toArray(props.children)}
      </StyledButton>
  }

  return <Wrapper>{button}</Wrapper>
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  handleRoute: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  handleRoute: null,
  href: '',
  onClick: noop
}

export default Button
