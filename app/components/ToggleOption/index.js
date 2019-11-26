/**
 *
 * ToggleOption
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {useIntl} from 'react-intl'

const ToggleOption = props => {
  const {formatMessage} = useIntl()

  // eslint-disable-next-line no-ternary
  const message = props.message
    ? formatMessage(props.message)
    : props.value

  return <option value={props.value}>{message}</option>
}

ToggleOption.propTypes = {
  message: PropTypes.object,
  value: PropTypes.string.isRequired
}

ToggleOption.defaultProps = {
  message: null
}

export default ToggleOption
