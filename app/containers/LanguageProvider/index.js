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
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {IntlProvider} from 'react-intl'

import {selectors} from 'modules/language'

export class LanguageProvider extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={this.props.messages[this.props.locale]}
        textComponent="span"
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    )
  }
}

LanguageProvider.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object
}

LanguageProvider.defaultProps = {
  messages: {}
}

const mapStateToProps = createStructuredSelector({
  locale: selectors.selectLocale
})

const withConnect = connect(mapStateToProps)

export default compose(withConnect)(LanguageProvider)
