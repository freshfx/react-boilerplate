/**
 * Test the HomePage
 */

import React from 'react'
import {shallow} from 'enzyme'

import ReposList from 'components/ReposList'
import {actions as repositoriesActions} from 'modules/repository/results'
import {actions} from 'modules/pages/home'

import {HomePage, mapDispatchToProps} from '../index'

describe('<HomePage />', () => {
  it('should render the repos list', () => {
    const renderedComponent = shallow(<HomePage isLoading error={false} repositories={[]} />)
    expect(renderedComponent.contains(<ReposList loading error={false} repos={[]} />)).toEqual(true)
  })

  it('should render fetch the repos on mount if a username exists', () => {
    const submitSpy = jest.fn()
    shallow(<HomePage
      username="Not Empty"
      onChangeUsername={() => {}}
      onSubmitForm={submitSpy}
    />)
    expect(submitSpy).toHaveBeenCalled()
  })

  it('should not call onSubmitForm if username is an empty string', () => {
    const submitSpy = jest.fn()
    shallow(<HomePage onChangeUsername={() => {}} onSubmitForm={submitSpy} />)
    expect(submitSpy).not.toHaveBeenCalled()
  })

  it('should not call onSubmitForm if username is null', () => {
    const submitSpy = jest.fn()
    shallow(<HomePage
      username=""
      onChangeUsername={() => {}}
      onSubmitForm={submitSpy}
    />)
    expect(submitSpy).not.toHaveBeenCalled()
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
