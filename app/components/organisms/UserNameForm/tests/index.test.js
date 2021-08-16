import React from 'react'
import {fireEvent} from '@testing-library/react'

import UsernameFormInjector from 'modules/ui/username-form/Injector'
import {actions} from 'modules/ui/username-form'
import render from 'utils/test-utils/custom-render'
import setupStore from 'utils/test-utils/setup-store'

import UserNameForm from '../index'
import messages from '../messages'

const {clearDispatch, options, store} = setupStore()

const renderComponent = (props = {}) =>
  render(<UserNameForm {...props} />, options)
const renderInjector = () => render(<UsernameFormInjector />, options)

describe('UserNameForm', () => {
  beforeAll(renderInjector)
  beforeEach(clearDispatch)

  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  describe('events', () => {
    describe('change', () => {
      it('should dispatch a changeUsername action with the targets value', () => {
        const username = 'ffx'
        const {getByPlaceholderText} = renderComponent()
        fireEvent.change(
          getByPlaceholderText(messages.trymePlaceholder.defaultMessage),
          {target: {value: username}}
        )
        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenCalledWith(
          actions.changeUsername({username})
        )
      })
    })

    describe('submit', () => {
      it('should call the onSubmit prop', () => {
        const onSubmit = jest.fn()
        const {container} = renderComponent({onSubmit})
        fireEvent.submit(container.firstChild)
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenCalledWith()
      })
    })
  })
})
