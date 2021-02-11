import {createSelector} from '@reduxjs/toolkit'

const selectRoute = state => state.route

const selectLocation = createSelector(selectRoute, route => route.location)

export {selectLocation, selectRoute}
