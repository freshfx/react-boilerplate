import React from 'react'
import PropTypes from 'prop-types'

import Item from './Item'
import Wrapper from './Wrapper'

const ListItem = ({item}) => (
  <Wrapper>
    <Item>{item}</Item>
  </Wrapper>
)

ListItem.propTypes = {
  item: PropTypes.any
}

ListItem.defaultProps = {
  item: null
}

export default ListItem
