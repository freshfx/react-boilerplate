import qs from 'qs'

import request from '../request'

const getByUser = (username, query) =>
  request(`/users/${username}/repos?${qs.stringify(query)}`)

export default getByUser
