/*
 *
 * LanguageToggle
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import noop from 'lodash/noop'

import Toggle from 'components/Toggle'
import {
  actions,
  selectors
} from 'modules/language'

import Wrapper from './Wrapper'
import messages from './messages'
import {appLocales} from '../../i18n'

class LocaleToggle extends React.PureComponent {
  onChangeLocale = ({target: {value}}) => {
    this.props.onChangeLocale(value)
  }

  render() {
    return (
      <Wrapper>
        <Toggle
          value={this.props.locale}
          values={appLocales}
          messages={messages}
          onToggle={this.onChangeLocale}
        />
      </Wrapper>
    )
  }
}

LocaleToggle.propTypes = {
  locale: PropTypes.string.isRequired,
  onChangeLocale: PropTypes.func
}

LocaleToggle.defaultProps = {
  onChangeLocale: noop
}

const mapStateToProps = createStructuredSelector({
  locale: selectors.selectLocale
})

const mapDispatchToProps = dispatch => ({
  onChangeLocale: locale => dispatch(actions.changeLocale({locale}))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export {
  LocaleToggle,
  mapDispatchToProps
}

export default compose(withConnect)(LocaleToggle)
