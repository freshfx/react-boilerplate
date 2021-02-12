/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import {defineMessages} from 'react-intl'

const scope = 'boilerplate.pages.HomePage'

export default defineMessages({
  startProjectHeader: {
    defaultMessage: 'Start your next react project in seconds',
    id: `${scope}.start_project.header`
  },
  startProjectMessage: {
    defaultMessage:
      'A highly scalable, offline-first foundation with the best DX and a focus on performance and best practices',
    id: `${scope}.start_project.message`
  },
  trymeHeader: {
    defaultMessage: 'Try me!',
    id: `${scope}.tryme.header`
  }
})
