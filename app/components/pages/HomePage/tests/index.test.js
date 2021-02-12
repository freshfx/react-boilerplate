/**
 * Test the HomePage
 */

import React from 'react'
import {fireEvent} from '@testing-library/react'

import configureStore from 'configure-store'
import HomePageInjector from 'hooks/ui/username-form/Injector'
import {actions} from 'modules/ui/username-form'
import {actions as repositoriesActions} from 'modules/repository/results'
import render from 'utils/test-utils/custom-render'
import renderInjectors from 'utils/test-utils/render-injectors'
import history from 'utils/history'

import HomePage from '../index'

jest.mock('components/organisms/UserNameForm', () => ({onSubmit}) => (
  <form data-testid="username-form" onSubmit={() => onSubmit()} />
))

const store = configureStore({}, history)
jest.spyOn(store, 'dispatch')

const options = {wrapperProps: {store}}
const renderComponent = () => render(<HomePage />, options)

describe('HomePage', () => {
  beforeAll(() => {
    renderInjectors(<HomePageInjector />, options)
  })

  beforeEach(() => {
    store.dispatch.mockClear()
  })

  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container).toMatchSnapshot()
  })

  describe('events', () => {
    describe('mount', () => {
      it('should dispatch a loadRepositories action if there is a username available', () => {
        store.dispatch(actions.changeUsername({username: 'mxstbr'}))
        store.dispatch.mockClear()
        renderComponent()
        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenCalledWith(
          repositoriesActions.loadRepositories()
        )
        store.dispatch(actions.changeUsername({username: ''}))
      })

      it('should not dispatch a loadRepositories action if there is no username', () => {
        renderComponent()
        expect(store.dispatch).not.toHaveBeenCalled()
      })
    })

    describe('submit form', () => {
      it('should dispatch a loadRepositories action', () => {
        const {getByTestId} = renderComponent()
        fireEvent.submit(getByTestId('username-form'))
        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenCalledWith(
          repositoriesActions.loadRepositories()
        )
      })
    })
  })
})
