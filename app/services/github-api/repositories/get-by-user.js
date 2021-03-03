import qs from 'qs'

import request from '../request'

const getByUser = (username, query, options) =>
  request(`/users/${username}/repos?${qs.stringify(query)}`, options)

export default getByUser
