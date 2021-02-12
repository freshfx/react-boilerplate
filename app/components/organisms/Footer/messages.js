/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import {defineMessages} from 'react-intl'

const scope = 'boilerplate.organisms.Footer'

export default defineMessages({
  authorMessage: {
    defaultMessage: `
      Made with love by {author}.
    `,
    id: `${scope}.author.message`
  },
  licenseMessage: {
    defaultMessage: 'This project is licensed under the MIT license.',
    id: `${scope}.license.message`
  }
})
