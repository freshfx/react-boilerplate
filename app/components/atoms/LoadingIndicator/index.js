import React, {useMemo} from 'react'
import PropTypes from 'prop-types'

import Path from './Path'
import Spinner from './Spinner'

const LoadingIndicator = ({className, lineWidth, size}) => {
  const center = useMemo(() => size / 2, [size])
  const radius = useMemo(() => (size - lineWidth) / 2, [size, lineWidth])

  return (
    <Spinner
      className={className}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        cx={center}
        cy={center}
        fill="none"
        lineWidth={lineWidth}
        r={radius}
        size={size}
        strokeLineCap="round"
        strokeWidth={lineWidth}
      />
    </Spinner>
  )
}

LoadingIndicator.propTypes = {
  className: PropTypes.string,
  lineWidth: PropTypes.number,
  size: PropTypes.number
}

LoadingIndicator.defaultProps = {
  className: null,
  lineWidth: 3,
  size: 32
}

export default React.memo(LoadingIndicator)
