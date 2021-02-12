import React from 'react'

import configureStore from 'configure-store'
import RepositoryResultsInjector from 'hooks/repository/results/Injector'
import UsernameFormInjector from 'hooks/ui/username-form/Injector'
import {actions as usernameFormActions} from 'modules/ui/username-form'
import history from 'utils/history'
import setEntities from 'utils/test-utils/set-entities'
import render from 'utils/test-utils/custom-render'
import renderInjectors from 'utils/test-utils/render-injectors'

import RepositoryListItem from '../index'

const store = configureStore({}, history)
jest.spyOn(store, 'dispatch')

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

const options = {wrapperProps: {store}}
const renderComponent = () => render(<RepositoryListItem id={id} />, options)
const Injectors = () => (
  <>
    <RepositoryResultsInjector />
    <UsernameFormInjector />
  </>
)

describe('RepositoryListItem', () => {
  beforeAll(() => {
    renderInjectors(<Injectors />, options)
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
