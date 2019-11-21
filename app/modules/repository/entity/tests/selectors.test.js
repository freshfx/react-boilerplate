import {
  makeSelectFullName,
  makeSelectName,
  makeSelectOpenIssuesCount,
  makeSelectOwnerUsername,
  makeSelectUrl
} from '../selectors'

const id = 1
const ownProps = {id}
const mockState = (data = {}) => ({
  entities: {
    repositories: {
      [id]: data
    }
  }
})

/* eslint-disable camelcase */
describe('repository modules', () => {
  describe('entity selectors', () => {
    describe('makeSelectOwnerUsername', () => {
      const selector = makeSelectOwnerUsername()

      it('should select the owner login state', () => {
        const owner = {login: 'mxstbr'}
        const mockedState = mockState({owner})
        expect(selector(mockedState, ownProps)).toEqual(owner.login)
      })
    })

    describe('makeSelectUrl', () => {
      const selector = makeSelectUrl()

      it('should select the html_url state', () => {
        const html_url = 'https://www.github.com'
        const mockedState = mockState({html_url})
        expect(selector(mockedState, ownProps)).toEqual(html_url)
      })
    })

    describe('makeSelectName', () => {
      const selector = makeSelectName()

      it('should select the name state', () => {
        const name = 'react-boilerplate'
        const mockedState = mockState({name})
        expect(selector(mockedState, ownProps)).toEqual(name)
      })
    })

    describe('makeSelectOpenIssuesCount', () => {
      const selector = makeSelectOpenIssuesCount()

      it('should select the open_issues_count state', () => {
        const open_issues_count = 10
        const mockedState = mockState({open_issues_count})
        expect(selector(mockedState, ownProps)).toEqual(open_issues_count)
      })
    })

    describe('makeSelectFullName', () => {
      const selector = makeSelectFullName()

      it('should select the full_name state', () => {
        const full_name = 'react boilerplate full name'
        const mockedState = mockState({full_name})
        expect(selector(mockedState, ownProps)).toEqual(full_name)
      })
    })
  })
})
