import React from 'react'
import {FormattedMessage} from 'react-intl'

import Anchor from './Anchor'
import Img from './Img'
import NavBar from './NavBar'
import HeaderLink from './HeaderLink'
import Banner from './banner.jpg'
import messages from './messages'

const Header = () => (
  <div>
    <Anchor href="https://twitter.com/mxstbr">
      <Img src={Banner} alt="react-boilerplate - Logo" />
    </Anchor>
    <NavBar>
      <HeaderLink to="/">
        <FormattedMessage {...messages.home} />
      </HeaderLink>
      <HeaderLink to="/features">
        <FormattedMessage {...messages.features} />
      </HeaderLink>
    </NavBar>
  </div>
)

export default Header
