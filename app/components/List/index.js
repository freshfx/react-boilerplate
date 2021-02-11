import React, {useMemo} from 'react'
import PropTypes from 'prop-types'

import Ul from './Ul'
import Wrapper from './Wrapper'

const List = ({component: ComponentToRender, items}) => {
  const renderItem = item => (
    <ComponentToRender key={`item-${item}`} id={item} />
  )

  const content = useMemo(() => {
    if (items.length) {
      return items.map(renderItem)
    }
    return <ComponentToRender />
  }, [items])

  return (
    <Wrapper>
      <Ul>{content}</Ul>
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
