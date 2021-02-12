import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {FormattedMessage, useIntl} from 'react-intl'
import noop from 'lodash/noop'

import useDispatcher from 'hooks/useDispatcher'
import {actions, selectors} from 'modules/ui/username-form'

import AtPrefix from './AtPrefix'
import Form from './Form'
import Input from './Input'
import messages from './messages'

const UserNameForm = props => {
  const {formatMessage} = useIntl()
  const username = useSelector(selectors.selectUsername)
  const changeUsername = useDispatcher({action: actions.changeUsername})

  const onChange = useCallback(
    ({target: {value}}) => {
      changeUsername({username: value})
    },
    [changeUsername]
  )

  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      props.onSubmit()
    },
    [props.onSubmit]
  )

  return (
    <Form onSubmit={onSubmit}>
      <label htmlFor="username">
        <FormattedMessage {...messages.trymeMessage} />
        <AtPrefix>
          <FormattedMessage {...messages.trymeAtPrefix} />
        </AtPrefix>
        <Input
          id="username"
          type="text"
          placeholder={formatMessage(messages.trymePlaceholder)}
          value={username}
          onChange={onChange}
        />
      </label>
    </Form>
  )
}

UserNameForm.propTypes = {
  onSubmit: PropTypes.func
}

UserNameForm.defaultProps = {
  onSubmit: noop
}

export default React.memo(UserNameForm)
