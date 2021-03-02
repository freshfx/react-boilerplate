/* eslint-disable sort-keys */
const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILURE: 'failure'
}
/* eslint-enables */

const AVAILABLE_STATUS = Object.values(STATUS)

export {AVAILABLE_STATUS}
export default STATUS
