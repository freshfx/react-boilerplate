# react-boilerplate

This is a modified fork from [react-boilerplate/react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)

## Requirements

* Node v14 or above

## Quick start

1.  Clone this repo using `git clone --depth=1 https://github.com/freshfx/react-boilerplate.git`
2.  Move to the appropriate directory: `cd react-boilerplate`.<br />
3.  Run `npm install` to install the dependencies and build the dlls
4.  Run `npm start` to start the application in dev mode

## Translations

To keep the application translated create a `messages.js` file in the component's directory.
After creating this file you can run `npm run extract-intl` to generate the translation files.

The `messages.js` should look like this:

```
import {defineMessages} from 'react-intl'

export default defineMessages({
  firstText: {
    defaultMessage: 'This is the first text',
    id: 'boilerplate.containers.container.first-text'
  },
  secondText: {
    defaultMessage: 'This is the second text',
    id: 'boilerplate.containers.container.second-text'
  }
})
```

The translations can be used in the component by using `react-intl`

```
import {FormattedMessage} from 'react-intl'
import messages from './messages'

<FormattedMessage {...messages.startProjectHeader} />
```

## Analyze

To analyze the webpack build run `npm run analyze` and open the generated file at [http://webpack.github.io/analyse/](http://webpack.github.io/analyse/)

## Documentation

- [**The Hitchhikers Guide to `react-boilerplate`**](docs/general/introduction.md): An introduction for newcomers to this boilerplate.
- [Overview](docs/general): A short overview of the included tools
- [**Commands**](docs/general/commands.md): Getting the most out of this boilerplate
- [Testing](docs/testing): How to work with the built-in test harness
- [Styling](docs/css): How to work with the CSS tooling
- [Your app](docs/js): Supercharging your app with Routing, Redux, simple
  asynchronicity helpers, etc.
- [**Troubleshooting**](docs/general/gotchas.md): Solutions to common problems faced by developers.
