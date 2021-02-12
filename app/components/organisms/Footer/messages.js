/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import {defineMessages} from 'react-intl'

export default defineMessages({
  authorMessage: {
    defaultMessage: `
      Made with love by {author}.
    `,
    id: 'boilerplate.components.Footer.author.message'
  },
  licenseMessage: {
    defaultMessage: 'This project is licensed under the MIT license.',
    id: 'boilerplate.components.Footer.license.message'
  }
})
