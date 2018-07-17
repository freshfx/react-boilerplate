/**
 * I18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en')
const deLocaleData = require('react-intl/locale-data/de')

const enTranslationMessages = require('./translations/en.json')
const deTranslationMessages = require('./translations/de.json')

addLocaleData(enLocaleData)
addLocaleData(deLocaleData)

const DEFAULT_LOCALE = 'en'

// Prettier-ignore
const appLocales = [
  'en',
  'de'
]

const translations = {
  formatTranslationMessages: function formatTranslationMessages(locale, messages) {
    const defaultFormattedMessages = this.getDefaultFormattedMessages(locale)
    const flattenFormattedMessages = (formattedMessages, key) => {
      let value = messages[key]
      if (!messages[key] && locale !== DEFAULT_LOCALE) {
        value = defaultFormattedMessages[key]
      }
      return Object.assign(formattedMessages, {[key]: value})
    }
    return Object.keys(messages).reduce(flattenFormattedMessages, {})
  },

  getDefaultFormattedMessages: function getDefaultFormattedMessages(locale) {
    if (locale !== DEFAULT_LOCALE) {
      return this.formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    }
    return {}
  }
}

const translationMessages = {
  de: translations.formatTranslationMessages('de', deTranslationMessages),
  en: translations.formatTranslationMessages('en', enTranslationMessages)
}

exports.appLocales = appLocales
exports.formatTranslationMessages = translations.formatTranslationMessages.bind(translations)
exports.translationMessages = translationMessages
exports.DEFAULT_LOCALE = DEFAULT_LOCALE
