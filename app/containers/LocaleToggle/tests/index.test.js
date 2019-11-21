import React from 'react'
import {render} from '@testing-library/react'
import {IntlProvider} from 'react-intl'

import {actions} from 'modules/language'

import {LocaleToggle, mapDispatchToProps} from '../index'

const renderComponent = (props = {}) => render(
  <IntlProvider locale="en">
    <LocaleToggle {...props} />
  </IntlProvider>
)

describe('LocaleToggle', () => {
  it('should render the default language messages', () => {
    const {container} = renderComponent({
      locale: 'en',
      onLocaleToggle: jest.fn()
    })
    expect(container.firstChild).toMatchSnapshot()
  })

  describe('mapDispatchToProps', () => {
    describe('onLocaleToggle', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.onChangeLocale).toBeDefined()
      })

      it('should dispatch changeLocale when called', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        const locale = 'de'
        result.onChangeLocale(locale)
        expect(dispatch).toHaveBeenCalledWith(actions.changeLocale({locale}))
      })
    })
  })
})
