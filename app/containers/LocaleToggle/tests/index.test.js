import React from 'react'
import {Provider} from 'react-redux'
import {createMemoryHistory as createHistory} from 'history'
import {mount, shallow} from 'enzyme'

import {actions} from 'modules/language'

import LocaleToggle, {mapDispatchToProps} from '../index'
import LanguageProvider from '../../LanguageProvider'

import configureStore from '../../../configure-store'
import {translationMessages} from '../../../i18n'

const history = createHistory()

describe('<LocaleToggle />', () => {
  let store = {}

  beforeAll(() => {
    store = configureStore({}, history)
  })

  it('should render the default language messages', () => {
    const renderedComponent = shallow(<Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <LocaleToggle />
      </LanguageProvider>
    </Provider>)
    expect(renderedComponent.contains(<LocaleToggle />)).toBe(true)
  })

  it('should present the default `en` english language option', () => {
    const renderedComponent = mount(<Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <LocaleToggle />
      </LanguageProvider>
    </Provider>)
    expect(renderedComponent.contains(<option value="en">en</option>)).toBe(true)
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
