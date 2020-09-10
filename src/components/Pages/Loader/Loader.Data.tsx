import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'

export default () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={100} />
    </div>
  )
}
