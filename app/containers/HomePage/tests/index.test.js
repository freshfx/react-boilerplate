/**
 * Test the HomePage
 */

import React from 'react'
import {render} from '@testing-library/react'
import {IntlProvider} from 'react-intl'
import {HelmetProvider} from 'react-helmet-async'

import {actions as repositoriesActions} from 'modules/repository/results'
import {actions} from 'modules/pages/home'

import {HomePage, mapDispatchToProps} from '../index'

jest.mock('components/ReposList', () => () => <div>Repos List</div>)

const renderComponent = (props = {}) =>
  render(
    <IntlProvider locale="en">
      <HelmetProvider>
        <HomePage {...props} />
      </HelmetProvider>
    </IntlProvider>
  )

describe('HomePage', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container).toMatchSnapshot()
  })

  it('should render the repos list', () => {
    const props = {
      error: false,
      loading: false,
      onSubmitForm: jest.fn(),
      repos: []
    }
    const {container} = renderComponent(props)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should fetch the repos on mount if a username exists', () => {
    const props = {
      onSubmitForm: jest.fn(),
      username: 'github-user'
    }
    renderComponent(props)
    expect(props.onSubmitForm).toHaveBeenCalledWith()
  })

  it('should not fetch the repos on mount', () => {
    const onSubmitForm = jest.fn()
    renderComponent({onSubmitForm})
    expect(onSubmitForm).not.toHaveBeenCalledWith()

    renderComponent({onSubmitForm, username: ' '})
    expect(onSubmitForm).not.toHaveBeenCalledWith()
  })

  describe('mapDispatchToProps', () => {
    describe('onChangeUsername', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.onChangeUsername).toBeDefined()
      })

      it('should dispatch changeUsername when called', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        const username = 'mxstbr'
        result.onChangeUsername({target: {value: username}})
        expect(dispatch).toHaveBeenCalledWith(actions.changeUsername({username}))
      })
    })

    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.onSubmitForm).toBeDefined()
      })

      it('should dispatch loadRepos when called', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        result.onSubmitForm()
        expect(dispatch).toHaveBeenCalledWith(repositoriesActions.loadRepositories())
      })

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn()
        const result = mapDispatchToProps(() => {})
        const evt = {preventDefault}
        result.onSubmitForm(evt)
        expect(preventDefault).toHaveBeenCalledWith()
      })
    })
  })
})
