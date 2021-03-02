import React from 'react'
import PropTypes from 'prop-types'

import Ul from './Ul'
import Wrapper from './Wrapper'

const List = ({component: ComponentToRender, items}) => {
  const renderItem = item => (
    <ComponentToRender key={`item-${item}`} id={item} />
  )

  return (
    <Wrapper>
      <Ul>
        {(items.length && items.map(renderItem)) || <ComponentToRender />}
      </Ul>
    </Wrapper>
  )
}

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array
}

List.defaultProps = {
  items: []
}

export default List
