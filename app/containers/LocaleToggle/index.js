/*
 *
 * LanguageToggle
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import Toggle from 'components/Toggle'
import Wrapper from './Wrapper'
import messages from './messages'
import {appLocales} from '../../i18n'
import {changeLocale} from '../LanguageProvider/actions'
import {makeSelectLocale} from '../LanguageProvider/selectors'

export class LocaleToggle extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <Toggle
          value={this.props.locale}
          values={appLocales}
          messages={messages}
          onToggle={this.props.onLocaleToggle}
        />
      </Wrapper>
    )
  }
}

LocaleToggle.propTypes = {
  locale: PropTypes.string.isRequired,
  onLocaleToggle: PropTypes.func.isRequired
}

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale
}))

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLocaleToggle: evt => dispatch(changeLocale(evt.target.value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle)
