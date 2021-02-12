const resetState = initialState => state => {
  Object.keys(initialState).forEach(key => {
    state[key] = initialState[key]
  })
}

// eslint-disable-next-line import/prefer-default-export
export {resetState}
