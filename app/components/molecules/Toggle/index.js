import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import ToggleOption from 'components/atoms/ToggleOption'

import Select from './Select'

const Toggle = props => {
  const renderOption = value => (
    <ToggleOption key={value} value={value} message={props.messages[value]} />
  )

  const content = useMemo(() => {
    // If we have items, render them
    if (props.values.length) {
      return props.values.map(renderOption)
    }
    return <option>--</option>
  }, [props.messages, props.values])

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
