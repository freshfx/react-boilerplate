import React from 'react'

import RepositoryResultsInjector from 'modules/repository/results/Injector'
import {actions} from 'modules/repository/results'
import render from 'utils/test-utils/custom-render'
import setupStore from 'utils/test-utils/setup-store'

import ReposList from '../index'

jest.mock('components/atoms/LoadingIndicator')
jest.mock('components/organisms/RepositoryListItem', () => ({id}) => (
  <div data-testid={`repo-list-item-${id}`} />
))

const {options, store} = setupStore()
const renderComponent = () => render(<ReposList />, options)
const renderInjector = () => render(<RepositoryResultsInjector />, options)

describe('ReposList', () => {
  beforeAll(renderInjector)

  afterEach(() => {
    store.dispatch(actions.resetState())
  })

  it('should render the loading indicator when its loading', () => {
    const {getByText} = renderComponent()
    store.dispatch(actions.fetchRepositories())
    expect(getByText('Loading')).toBeDefined()
  })

  it('should render an error if loading failed', () => {
    const {getByText} = renderComponent()
    store.dispatch(actions.fetchRepositories.rejected())
    expect(getByText(/Something went wrong/u)).toBeDefined()
  })

  it('should render the repositories if loading was successful', () => {
    const {getByTestId} = renderComponent()
    const data = [1, 2]
    store.dispatch(actions.fetchRepositories.resolved({data}))
    expect(getByTestId('repo-list-item-1')).toBeDefined()
    expect(getByTestId('repo-list-item-2')).toBeDefined()
  })

  it('should not render anything if the state is idle', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toBeNull()
  })
})
