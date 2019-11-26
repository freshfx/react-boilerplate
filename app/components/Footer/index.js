import React from 'react'
import {FormattedMessage} from 'react-intl'

import Anchor from 'components/Anchor'
import LocaleToggle from 'containers/LocaleToggle'
import Wrapper from './Wrapper'
import messages from './messages'

const Footer = () => (
  <Wrapper>
    <section>
      <FormattedMessage {...messages.licenseMessage} />
    </section>
    <section>
      <LocaleToggle />
    </section>
    <section>
      <FormattedMessage
        {...messages.authorMessage}
        values={{
          author: <Anchor href="https://github.com/freshfx">FreshFX</Anchor>
        }}
      />
    </section>
  </Wrapper>
)

export default Footer
