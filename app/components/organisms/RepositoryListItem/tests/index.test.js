import React from 'react'

import RepositoryResultsInjector from 'modules/repository/results/Injector'
import AppInjector from 'components/Injector'
import UsernameFormInjector from 'modules/ui/username-form/Injector'
import {actions as usernameFormActions} from 'modules/ui/username-form'
import setEntities from 'utils/test-utils/set-entities'
import render from 'utils/test-utils/custom-render'
import setupStore from 'utils/test-utils/setup-store'

import RepositoryListItem from '../index'

const id = 'repository-id-1'
/* eslint-disable camelcase */
const repository = {
  full_name: 'react-boilerplate/react-boilerplate',
  html_url: 'https://github.com/react-boilerplate/react-boilerplate',
  id,
  name: 'react-boilerplate',
  open_issues_count: 20,
  owner: {login: 'mxstbr'}
}
/* eslint-enable */

const {options, store} = setupStore()
const renderComponent = () => render(<RepositoryListItem id={id} />, options)
const renderInjectors = () =>
  render(
    <>
      <AppInjector />
      <RepositoryResultsInjector />
      <UsernameFormInjector />
    </>,
    options
  )

describe('RepositoryListItem', () => {
  beforeAll(() => {
    renderInjectors()
    setEntities(store, {repositories: {[id]: repository}})
    store.dispatch(usernameFormActions.changeUsername({username: 'mxstbr'}))
  })

  it('should match snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should add nameprefix if user is not currentUser', () => {
    const username = 'ffx'
    const {getByText} = renderComponent()
    expect(getByText(repository.name))
    store.dispatch(usernameFormActions.changeUsername({username}))
    expect(getByText(`${repository.owner.login}/${repository.name}`))
  })
})
