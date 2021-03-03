import React from 'react'

import configureStore from 'configure-store'
import RepositoryResultsInjector from 'hooks/repository/results/Injector'
import {actions} from 'modules/repository/results'
import getByUser from 'services/github-api/repositories/get-by-user'
import render from 'utils/test-utils/custom-render'
import renderInjectors from 'utils/test-utils/render-injectors'
import history from 'utils/history'

import ReposList from '../index'

jest.mock('components/atoms/LoadingIndicator')
jest.mock('components/organisms/RepositoryListItem', () => ({id}) => (
  <div data-testid={`repo-list-item-${id}`} />
))
jest.mock('services/github-api/repositories/get-by-user', () =>
  jest.fn(() => Promise.resolve())
)

const store = configureStore({}, history)
const options = {wrapperProps: {store}}
const renderComponent = () => render(<ReposList />, options)

describe('ReposList', () => {
  beforeAll(() => {
    renderInjectors(<RepositoryResultsInjector />, options)
  })

  afterEach(() => {
    store.dispatch(actions.resetState())
  })

  it('should render the loading indicator when its loading', () => {
    const {getByText} = renderComponent()
    store.dispatch(actions.fetchRepositories())
    expect(getByText('Loading')).toBeDefined()
  })

  it('should render an error if loading failed', async () => {
    const {getByText} = renderComponent()
    getByUser.mockReturnValueOnce(Promise.reject(new Error()))
    await store.dispatch(actions.fetchRepositories())
    expect(getByText(/Something went wrong/u)).toBeDefined()
  })

  it('should render the repositories if loading was successful', async () => {
    const {getByTestId} = renderComponent()
    const data = [1, 2]
    getByUser.mockReturnValueOnce(
      Promise.resolve(data.map(id => ({id, type: 'repositories'})))
    )
    await store.dispatch(actions.fetchRepositories())
    expect(getByTestId('repo-list-item-1')).toBeDefined()
    expect(getByTestId('repo-list-item-2')).toBeDefined()
  })

  it('should not render anything if nothing interesting is provided', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toBeNull()
  })
})
