/* eslint-disable camelcase */

/**
 * Test the repo list item
 */

import React from 'react'
import {render, shallow} from 'enzyme'
import {IntlProvider} from 'react-intl'

import ListItem from 'components/ListItem'
import {RepoListItem} from '../index'

const id = 'repository-id-1'
const renderComponent = (props = {}) =>
  render(<IntlProvider locale="en">
    <RepoListItem id={id} {...props} />
  </IntlProvider>)

describe('<RepoListItem />', () => {
  let item = {}

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      fullName: 'react-boilerplate/react-boilerplate',
      name: 'react-boilerplate',
      openIssuesCount: 20,
      ownerUsername: 'mxstbr',
      url: 'https://github.com/react-boilerplate/react-boilerplate'
    }
  })

  it('should render a ListItem', () => {
    const renderedComponent = shallow(<RepoListItem id={id} {...item} />)
    /* eslint-disable-next-line no-magic-numbers */
    expect(renderedComponent.find(ListItem).length).toBe(1)
  })

  it('should not render the current username', () => {
    const renderedComponent = renderComponent({
      ...item,
      username: item.ownerUsername
    })
    expect(renderedComponent.text()).not.toContain(item.ownerUsername)
  })

  it('should render usernames that are not the current one', () => {
    const renderedComponent = renderComponent({
      ...item,
      username: 'nikgraf'
    })
    expect(renderedComponent.text()).toContain(item.ownerUsername)
  })

  it('should render the repo name', () => {
    const renderedComponent = renderComponent(item)
    expect(renderedComponent.text()).toContain(item.name)
  })

  it('should render the issue count', () => {
    const renderedComponent = renderComponent(item)
    expect(renderedComponent.text()).toContain(item.openIssuesCount)
  })

  it('should render the IssueIcon', () => {
    const renderedComponent = renderComponent(item)
    /* eslint-disable-next-line no-magic-numbers */
    expect(renderedComponent.find('svg').length).toBe(1)
  })
})
