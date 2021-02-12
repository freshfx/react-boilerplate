/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {useSelector} from 'react-redux'
import {IntlProvider} from 'react-intl'

import {selectors} from 'modules/language'

const LanguageProvider = ({children, messages}) => {
  const locale = useSelector(selectors.selectLocale)

  return (
    <IntlProvider
      locale={locale}
      key={locale}
      messages={messages[locale]}
      textComponent="span"
    >
      {React.Children.only(children)}
    </IntlProvider>
  )
}

LanguageProvider.propTypes = {
  children: PropTypes.element.isRequired,
  messages: PropTypes.object
}

LanguageProvider.defaultProps = {
  messages: {}
}

export default compose(React.memo)(LanguageProvider)
