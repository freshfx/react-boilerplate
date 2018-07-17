/*
 *
 * LanguageProvider actions
 *
 */

import {CHANGE_LOCALE} from './constants'

export const changeLocale = languageLocale => ({
  locale: languageLocale,
  type: CHANGE_LOCALE
})

export default {changeLocale}
