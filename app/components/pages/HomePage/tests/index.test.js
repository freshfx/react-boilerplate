import React from 'react'
import {fireEvent} from '@testing-library/react'

import configureTestStore from 'utils/test-utils/configure-test-store'
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

const store = configureTestStore({}, history)
jest.spyOn(store, 'dispatch')

const options = {wrapperProps: {store}}
const renderComponent = () => render(<HomePage />, options)

describe('HomePage', () => {
  beforeAll(() => {
    renderInjectors(<HomePageInjector />, options)
  })

  beforeEach(() => {
    store.clearActions()
  })

  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container).toMatchSnapshot()
  })

  describe('events', () => {
    describe('mount', () => {
      it('should dispatch a loadRepositories action if there is a username available', () => {
        store.dispatch(actions.changeUsername({username: 'mxstbr'}))
        store.clearActions()
        renderComponent()
        const dispatchedTypes = store.getActionTypes()
        expect(dispatchedTypes).toHaveLength(1)
        expect(dispatchedTypes[0]).toEqual(
          `${repositoriesActions.fetchRepositories.typePrefix}/pending`
        )
        store.dispatch(actions.changeUsername({username: ''}))
      })

      it('should not dispatch a loadRepositories action if there is no username', () => {
        renderComponent()
        expect(store.getActionTypes()).toHaveLength(0)
      })
    })

    describe('submit form', () => {
      it('should dispatch a loadRepositories action', () => {
        const {getByTestId} = renderComponent()
        fireEvent.submit(getByTestId('username-form'))
        const dispatchedTypes = store.getActionTypes()
        expect(dispatchedTypes).toHaveLength(1)
        expect(dispatchedTypes[0]).toEqual(
          `${repositoriesActions.fetchRepositories.typePrefix}/pending`
        )
      })
    })
  })
})
