/*
 * FeaturePage Messages
 *
 * This contains all the text for the FeaturePage component.
 */
import {defineMessages} from 'react-intl'

const scope = 'boilerplate.containers.FeaturePage'

export default defineMessages({
  cssHeader: {
    defaultMessage: 'Features',
    id: `${scope}.css.header`
  },
  cssMessage: {
    defaultMessage: 'Next generation CSS',
    id: `${scope}.css.message`
  },
  feedbackHeader: {
    defaultMessage: 'Instant feedback',
    id: `${scope}.feedback.header`
  },
  feedbackMessage: {
    defaultMessage: `
      Enjoy the best DX and code your app at the speed of thought! Your
    saved changes to the CSS and JS are reflected instantaneously
    without refreshing the page. Preserve application state even when
    you update something in the underlying code!
    `,
    id: `${scope}.feedback.message`
  },
  header: {
    defaultMessage: 'Features',
    id: `${scope}.header`
  },
  intlHeader: {
    defaultMessage:
      'Complete i18n Standard Internationalization & Pluralization',
    id: `${scope}.internationalization.header`
  },
  intlMessage: {
    defaultMessage:
      'Scalable apps need to support multiple languages, easily add and support multiple languages with `react-intl`.',
    id: `${scope}.internationalization.message`
  },
  javascriptHeader: {
    defaultMessage: 'Next generation JavaScript',
    id: `${scope}.javascript.header`
  },
  javascriptMessage: {
    defaultMessage: `Use template strings, object destructuring, arrow functions, JSX
    syntax and more, today.`,
    id: `${scope}.javascript.message`
  },
  networkHeader: {
    defaultMessage: 'Offline-first',
    id: `${scope}.network.header`
  },
  networkMessage: {
    defaultMessage: `
      The next frontier in performant web apps: availability without a
      network connection from the instant your users load the app.
    `,
    id: `${scope}.network.message`
  },
  routingHeader: {
    defaultMessage: 'Industry-standard routing',
    id: `${scope}.routing.header`
  },
  routingMessage: {
    defaultMessage: `
      Write composable CSS that's co-located with your components for
    complete modularity. Unique generated class names keep the
    specificity low while eliminating style clashes. Ship only the
    styles that are on the page for the best performance.
    `,
    id: `${scope}.routing.message`
  },
  scaffoldingHeader: {
    defaultMessage: 'Quick scaffolding',
    id: `${scope}.scaffolding.header`
  },
  scaffoldingMessage: {
    defaultMessage: `Automate the creation of components, containers, routes, selectors
  and sagas - and their tests - right from the CLI!`,
    id: `${scope}.scaffolding.message`
  },
  stateManagementHeader: {
    defaultMessage: 'Predictable state management',
    id: `${scope}.state_management.header`
  },
  stateManagementMessages: {
    defaultMessage: `
      Unidirectional data flow allows for change logging and time travel
    debugging.
    `,
    id: `${scope}.state_management.message`
  }
})
