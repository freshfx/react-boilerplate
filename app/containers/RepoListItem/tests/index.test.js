import React from 'react'
import {render} from '@testing-library/react'
import {IntlProvider} from 'react-intl'

import {RepoListItem} from '../index'

jest.mock('components/ListItem', () => ({item}) => item)

const id = 'repository-id-1'
const renderComponent = (props = {}) => render(
  <IntlProvider locale="en">
    <RepoListItem id={id} {...props} />
  </IntlProvider>
)

const defaultProps = {
  fullName: 'react-boilerplate/react-boilerplate',
  name: 'react-boilerplate',
  openIssuesCount: 20,
  ownerUsername: 'mxstbr',
  url: 'https://github.com/react-boilerplate/react-boilerplate'
}

describe('RepoListItem', () => {
  it('should match snapshot', () => {
    const props = {
      ...defaultProps,
      username: defaultProps.ownerUsername
    }
    const {container} = renderComponent(props)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should add nameprefix if user is not currentUser', () => {
    const {getByText} = renderComponent(defaultProps)
    expect(getByText(`${defaultProps.ownerUsername}/${defaultProps.name}`))
  })
})
