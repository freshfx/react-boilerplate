import {createSlice} from '@reduxjs/toolkit'

import STATUS from '../status'

import {resetState} from './common-actions'

/* eslint-disable sort-keys */
const createAsyncResultsSlice = ({
  asyncThunk,
  initialState,
  scope,
  reducers,
  extraReducers
}) =>
  createSlice({
    name: scope,
    initialState,
    reducers: {
      resetState: resetState(initialState),
      ...reducers
    },
    extraReducers: {
      [asyncThunk.pending]: (state, action) => {
        state.error = null
        state.status = STATUS.PENDING

        if (action.meta.arg?.isDirty !== false) {
          state.data = []
        }
      },
      [asyncThunk.fulfilled]: (state, action) => {
        const {payload: {data = []} = {}} = action

        if (action.meta.arg?.isDirty === false) {
          state.data.push(...data)
        } else {
          state.data = data
        }

        state.hasNextPage = Boolean(action.payload?.hasNextPage)
        state.status = STATUS.SUCCESS
        state.total = action.payload?.total ?? 0
      },
      [asyncThunk.rejected]: (state, action) => {
        state.error = action.payload?.error

        if (action.meta.aborted !== true) {
          state.status = STATUS.FAILURE
        }
      },
      ...extraReducers
    }
  })
/* eslint-enable */

export {
  // eslint-disable-next-line import/prefer-default-export
  createAsyncResultsSlice
}
