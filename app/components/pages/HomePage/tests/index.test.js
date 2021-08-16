import React from 'react'
import {fireEvent} from '@testing-library/react'

import HomePageInjector from 'modules/ui/username-form/Injector'
import {actions} from 'modules/ui/username-form'
import {actions as repositoriesActions} from 'modules/repository/results'
import render from 'utils/test-utils/custom-render'
import setupStore from 'utils/test-utils/setup-store'

import HomePage from '../index'

jest.mock('components/organisms/UserNameForm', () => ({onSubmit}) => (
  <form data-testid="username-form" onSubmit={() => onSubmit()} />
))

const {clearDispatch, options, store} = setupStore()
const renderComponent = () => render(<HomePage />, options)
const renderInjector = () => render(<HomePageInjector />, options)

describe('HomePage', () => {
  beforeAll(renderInjector)
  beforeEach(clearDispatch)

  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container).toMatchSnapshot()
  })

  describe('events', () => {
    describe('mount', () => {
      it('should dispatch a loadRepositories action if there is a username available', () => {
        store.dispatch(actions.changeUsername({username: 'mxstbr'}))
        clearDispatch()
        renderComponent()
        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenLastCalledWith(
          repositoriesActions.fetchRepositories()
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
        expect(store.dispatch).toHaveBeenLastCalledWith(
          repositoriesActions.fetchRepositories()
        )
      })
    })
  })
})
