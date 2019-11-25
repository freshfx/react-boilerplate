import React from 'react'
import {render} from '@testing-library/react'
import {IntlProvider} from 'react-intl'

import RepositoryListItem from '../index'
import useRepository from '../useRepository'

const mockedState = {
  fullName: 'react-boilerplate/react-boilerplate',
  name: 'react-boilerplate',
  openIssuesCount: 20,
  ownerUsername: 'mxstbr',
  url: 'https://github.com/react-boilerplate/react-boilerplate',
  username: 'mxstbr'
}
jest.mock('../useRepository')
jest.mock('components/ListItem', () => ({item}) => item)

const id = 'repository-id-1'
const renderComponent = (props = {}) => render(
  <IntlProvider locale="en">
    <RepositoryListItem id={id} {...props} />
  </IntlProvider>
)

describe('RepositoryListItem', () => {
  beforeAll(() => {
    useRepository.mockImplementation(() => [mockedState])
  })

  it('should match snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should add nameprefix if user is not currentUser', () => {
    const username = 'ffx'
    useRepository.mockImplementationOnce(() => [{...mockedState, username}])
    const {getByText} = renderComponent()
    expect(getByText(`${mockedState.ownerUsername}/${mockedState.name}`))
  })
})
