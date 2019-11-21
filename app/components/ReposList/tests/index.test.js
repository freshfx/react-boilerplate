import React from 'react'
import {render} from '@testing-library/react'
import {IntlProvider} from 'react-intl'

import ReposList from '../index'

jest.mock('components/LoadingIndicator', () => () => <div data-testid="loading-indicator" />)
jest.mock('containers/RepoListItem', () => ({id}) => <div data-testid={`repo-list-item-${id}`} />)

describe('<ReposList />', () => {
  it('should render the loading indicator when its loading', () => {
    const {getByTestId} = render(<ReposList loading />)
    expect(getByTestId('loading-indicator')).toBeDefined()
  })

  it('should render an error if loading failed', () => {
    const {getByText} = render(
      <IntlProvider locale="en">
        <ReposList error={{message: 'Loading failed!'}} />
      </IntlProvider>
    )
    expect(getByText(/Something went wrong/u)).toBeDefined()
  })

  it('should render the repositories if loading was successful', () => {
    const repos = [1, 2]
    const {getByTestId} = render(<ReposList repos={repos} />)
    expect(getByTestId('repo-list-item-1')).toBeDefined()
    expect(getByTestId('repo-list-item-2')).toBeDefined()
  })

  it('should not render anything if nothing interesting is provided', () => {
    const {container} = render(<ReposList />)
    expect(container.firstChild).toBeNull()
  })
})
