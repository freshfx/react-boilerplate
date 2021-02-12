/**
 * GenericTemplate
 *
 * This is just an empty template to illustrate the usage of templates in atomic design
 */

import React from 'react'
import PropTypes from 'prop-types'

const GenericTemplate = ({children}) => <article>{children}</article>

GenericTemplate.propTypes = {
  children: PropTypes.node.isRequired
}

export default GenericTemplate
