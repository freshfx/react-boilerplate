import React from 'react'

import configureStore from 'configure-store'
import RepositoryResultsInjector from 'hooks/repository/results/Injector'
import {actions} from 'modules/repository/results'
import render from 'utils/test-utils/custom-render'
import renderInjectors from 'utils/test-utils/render-injectors'
import history from 'utils/history'
import setEntities from 'utils/test-utils/set-entities'

import ReposList from '../index'

jest.mock('components/atoms/LoadingIndicator')
jest.mock('components/organisms/RepositoryListItem', () => ({id}) => (
  <div data-testid={`repo-list-item-${id}`} />
))

const store = configureStore({}, history)
const options = {wrapperProps: {store}}
const renderComponent = () => render(<ReposList />, options)

const id = 'repository-id-1'
const repository = {}

describe('ReposList', () => {
  beforeAll(() => {
    renderInjectors(<RepositoryResultsInjector />, options)
    setEntities(store, {repositories: {[id]: repository}})
  })

  afterEach(() => {
    store.dispatch(actions.resetState())
  })

  it('should render the loading indicator when its loading', () => {
    const {getByText} = renderComponent()
    store.dispatch(actions.loadRepositories())
    expect(getByText('Loading')).toBeDefined()
  })

  it('should render an error if loading failed', () => {
    const {getByText} = renderComponent()
    store.dispatch(
      actions.repositoriesLoadingError({error: {message: 'Loading failed!'}})
    )
    expect(getByText(/Something went wrong/u)).toBeDefined()
  })

  it('should render the repositories if loading was successful', () => {
    const {getByTestId} = renderComponent()
    store.dispatch(actions.repositoriesLoaded({repositories: [1, 2]}))
    expect(getByTestId('repo-list-item-1')).toBeDefined()
    expect(getByTestId('repo-list-item-2')).toBeDefined()
  })

  it('should not render anything if nothing interesting is provided', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toBeNull()
  })
})
