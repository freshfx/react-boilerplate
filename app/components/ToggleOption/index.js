/**
 *
 * ToggleOption
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl, intlShape} from 'react-intl'

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
  intl: intlShape.isRequired,
  message: PropTypes.object,
  value: PropTypes.string.isRequired
}

ToggleOption.defaultProps = {
  message: null
}

export default injectIntl(ToggleOption)
