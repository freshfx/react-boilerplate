/*
 *
 * LanguageToggle
 *
 */

import React from 'react'
import {compose} from 'redux'
import {useDispatch, useSelector} from 'react-redux'

import {appLocales} from 'i18n'
import Toggle from 'components/Toggle'
import {actions, selectors} from 'modules/language'

import Wrapper from './Wrapper'
import messages from './messages'

const LocaleToggle = () => {
  const dispatch = useDispatch()
  const locale = useSelector(selectors.selectLocale)

  const onChangeLocale = ({target: {value}}) => {
    dispatch(actions.changeLocale({locale: value}))
  }

  return (
    <Wrapper>
      <Toggle
        value={locale}
        values={appLocales}
        messages={messages}
        onToggle={onChangeLocale}
      />
    </Wrapper>
  )
}

export default compose(React.memo)(LocaleToggle)
