import React from 'react'
import {render} from '@testing-library/react'
import {useSelector} from 'react-redux'

import {selectors} from 'modules/repository/entity'
import {selectors as homePageSelectors} from 'modules/pages/home'
import useMemoizedSelector from 'utils/useMemoizedSelector'

import useRepository from '../useRepository'

jest.mock('react-redux')
jest.mock('utils/useMemoizedSelector')

const TestComponent = ({id}) => {
  useRepository(id)
  return null
}
const renderComponent = id => render(<TestComponent id={id} />)

describe('RepositoryListItem', () => {
  describe('hook', () => {
    const id = 'repository-1'

    beforeEach(() => {
      useSelector.mockClear()
      useMemoizedSelector.mockClear()
    })

    it('should call the useMemoizedSelector hook with the fullName selector factory', () => {
      renderComponent(id)
      expect(
        useMemoizedSelector
      ).toHaveBeenCalledWith(selectors.makeSelectFullName, {id})
    })

    it('should call the useMemoizedSelector hook with the name selector factory', () => {
      renderComponent(id)
      expect(useMemoizedSelector).toHaveBeenCalledWith(
        selectors.makeSelectName,
        {id}
      )
    })

    it('should call the useMemoizedSelector hook with the openIssuesCount selector factory', () => {
      renderComponent(id)
      expect(
        useMemoizedSelector
      ).toHaveBeenCalledWith(selectors.makeSelectOpenIssuesCount, {id})
    })

    it('should call the useMemoizedSelector hook with the ownerUsername selector factory', () => {
      renderComponent(id)
      expect(
        useMemoizedSelector
      ).toHaveBeenCalledWith(selectors.makeSelectOwnerUsername, {id})
    })

    it('should call the useMemoizedSelector hook with the url selector factory', () => {
      renderComponent(id)
      expect(useMemoizedSelector).toHaveBeenCalledWith(
        selectors.makeSelectUrl,
        {id}
      )
    })

    it('should call the useSelector hook with the username selector', () => {
      renderComponent(id)
      expect(useSelector).toHaveBeenCalledWith(homePageSelectors.selectUsername)
    })
  })
})
