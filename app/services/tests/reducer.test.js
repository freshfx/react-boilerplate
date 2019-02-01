import {fromJS} from 'immutable'

import reducer, {initialState} from '../reducer'
import {
  resourcesLoaded
} from '../actions'

describe('serviceReducer', () => {
  it('should return the initial state', () => {
    /* eslint-disable-next-line no-undefined */
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle the resourcesLoaded action correctly', () => {
    const mockedState = fromJS({
      albums: {
        1: {name: 'Album 1'}
      },
      tracks: {
        1: {name: 'Track 1'},
        2: {name: 'Track 2'}
      }
    })

    const entities = fromJS({
      playlists: {
        1: {name: 'Playlist 1'}
      },
      tracks: {
        1: {name: 'new Track 1'}
      }
    })

    const expectedResult = fromJS({
      albums: {
        1: {name: 'Album 1'}
      },
      playlists: {
        1: {name: 'Playlist 1'}
      },
      tracks: {
        1: {name: 'new Track 1'},
        2: {name: 'Track 2'}
      }
    })

    expect(reducer(mockedState, resourcesLoaded(entities))).toEqual(expectedResult)
  })
})
