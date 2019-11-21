import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import Select from './Select'
import ToggleOption from '../ToggleOption'

function Toggle(props) {
  let content = <option>--</option>

  // If we have items, render them
  if (props.values.length) {
    content = props.values.map(value =>
      <ToggleOption key={value} value={value} message={props.messages[value]} />)
  }

  return (
    <Select value={props.value} onChange={props.onToggle}>
      {content}
    </Select>
  )
}

Toggle.propTypes = {
  messages: PropTypes.object,
  onToggle: PropTypes.func,
  value: PropTypes.string,
  values: PropTypes.array
}

Toggle.defaultProps = {
  messages: {},
  onToggle: noop,
  value: '',
  values: []
}

export default Toggle
