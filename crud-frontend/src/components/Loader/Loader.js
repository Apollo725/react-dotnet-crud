// Externals
import React from 'react'

// Styles
import './Loader.scss'

const Loader = ({ dataTestId }) => {
  return (
    <svg className="spinner" viewBox="0 0 50 50" data-testid={dataTestId}>
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>
  )
}

export default Loader
