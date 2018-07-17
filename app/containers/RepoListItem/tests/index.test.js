/* eslint-disable camelcase */

/**
 * Test the repo list item
 */

import React from 'react'
import {render, shallow} from 'enzyme'
import {IntlProvider} from 'react-intl'

import ListItem from 'components/ListItem'
import {RepoListItem} from '../index'

const renderComponent = (props = {}) =>
  render(<IntlProvider locale="en">
    <RepoListItem {...props} />
  </IntlProvider>)

describe('<RepoListItem />', () => {
  let item = {}

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      full_name: 'react-boilerplate/react-boilerplate',
      html_url: 'https://github.com/react-boilerplate/react-boilerplate',
      name: 'react-boilerplate',
      open_issues_count: 20,
      owner: {
        login: 'mxstbr'
      }
    }
  })

  it('should render a ListItem', () => {
    const renderedComponent = shallow(<RepoListItem item={item} />)
    /* eslint-disable-next-line no-magic-numbers */
    expect(renderedComponent.find(ListItem).length).toBe(1)
  })

  it('should not render the current username', () => {
    const renderedComponent = renderComponent({
      currentUser: item.owner.login,
      item
    })
    expect(renderedComponent.text()).not.toContain(item.owner.login)
  })

  it('should render usernames that are not the current one', () => {
    const renderedComponent = renderComponent({
      currentUser: 'nikgraf',
      item
    })
    expect(renderedComponent.text()).toContain(item.owner.login)
  })

  it('should render the repo name', () => {
    const renderedComponent = renderComponent({item})
    expect(renderedComponent.text()).toContain(item.name)
  })

  it('should render the issue count', () => {
    const renderedComponent = renderComponent({item})
    expect(renderedComponent.text()).toContain(item.open_issues_count)
  })

  it('should render the IssueIcon', () => {
    const renderedComponent = renderComponent({item})
    /* eslint-disable-next-line no-magic-numbers */
    expect(renderedComponent.find('svg').length).toBe(1)
  })
})
