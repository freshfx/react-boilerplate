/**
 *
 * ToggleOption
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'

class ToggleOption extends React.PureComponent {
  getMessage() {
    const {
      message,
      value,
      intl
    } = this.props

    if (message) {
      return intl.formatMessage(message)
    }
    return value
  }

  render() {
    const {value} = this.props
    return <option value={value}>{this.getMessage()}</option>
  }
}

ToggleOption.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  message: PropTypes.object,
  value: PropTypes.string.isRequired
}

ToggleOption.defaultProps = {
  message: null
}

export default injectIntl(ToggleOption)
