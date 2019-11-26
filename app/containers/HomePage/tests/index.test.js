/**
 * Test the HomePage
 */

import React from 'react'
import {
  fireEvent,
  render
} from '@testing-library/react'
import {IntlProvider} from 'react-intl'
import {HelmetProvider} from 'react-helmet-async'
import {Provider} from 'react-redux'

import configureStore from 'configure-store'
import {
  actions
} from 'modules/pages/home'
import {
  actions as repositoriesActions
} from 'modules/repository/results'
import history from 'utils/history'

import HomePage from '../index'
import messages from '../messages'

jest.mock('components/ReposList', () => props => {
  if (props.loading) {
    return 'ReposList Loading'
  }
  if (props.error) {
    return 'ReposList Error'
  }
  if (props.repos.length) {
    return 'ReposList'
  }
  return 'ReposList Empty'
})

const store = configureStore({}, history)
const dispatch = jest.spyOn(store, 'dispatch')

const renderComponent = () =>
  render(
    <IntlProvider locale="en">
      <HelmetProvider>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </HelmetProvider>
    </IntlProvider>
  )

describe('HomePage', () => {
  beforeEach(() => {
    dispatch.mockClear()
  })

  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the repo list with the correct props', () => {
    const {getByText} = renderComponent()
    expect(getByText('ReposList Empty')).toBeInTheDocument()

    store.dispatch(repositoriesActions.loadRepositories())
    expect(getByText('ReposList Loading')).toBeInTheDocument()

    const repositories = [1, 2, 3]
    store.dispatch(repositoriesActions.repositoriesLoaded({repositories}))
    expect(getByText('ReposList')).toBeInTheDocument()

    store.dispatch(repositoriesActions.repositoriesLoadingError({error: {}}))
    expect(getByText('ReposList Error')).toBeInTheDocument()
  })

  it('should fetch the repos on mount if a username exists', () => {
    store.dispatch(actions.changeUsername({username: 'mxstbr'}))
    renderComponent()
    expect(store.dispatch).toHaveBeenCalledWith(repositoriesActions.loadRepositories())
    store.dispatch(actions.changeUsername({username: ''}))
  })

  it('should not fetch the repos on mount', () => {
    renderComponent()
    expect(store.dispatch).not.toHaveBeenCalled()
  })

  it('should call the correct event when a user changes the input', () => {
    const username = 'mxstbr'
    const {getByLabelText} = renderComponent()
    const domNode = getByLabelText(RegExp(messages.trymeMessage.defaultMessage, 'u'))
    const event = {target: {value: username}}
    fireEvent.change(domNode, event)

    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(actions.changeUsername({username}))

    store.dispatch(actions.changeUsername({username: ''}))
  })

  it('should call the correct event when a user submits the form', () => {
    const {getByPlaceholderText} = renderComponent()
    fireEvent.submit(getByPlaceholderText('mxstbr'))

    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(repositoriesActions.loadRepositories())
  })
})
