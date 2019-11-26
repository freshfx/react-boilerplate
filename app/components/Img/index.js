/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react'
import PropTypes from 'prop-types'

const Img = props => <img className={props.className} src={props.src} alt={props.alt} />

// We require the use of src and alt, only enforced by react in dev mode
Img.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired
}

Img.defaultProps = {
  className: null
}

export default Img
