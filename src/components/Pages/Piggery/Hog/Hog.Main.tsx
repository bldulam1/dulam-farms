import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import HogFormDialog from './Hog.FormDialog'
import PiggeryStyles from '../Piggery.Styles'
import Toolbar from '@material-ui/core/Toolbar'

export default () => {
  const classes = PiggeryStyles()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleClose = () => setDialogOpen(false)
  const handleOpen = () => setDialogOpen(true)

  return (
    <div>
      <HogFormDialog open={dialogOpen} onClose={handleClose} />
      <Toolbar className={classes.tableToolBar}>
        <Button
          onClick={handleOpen}
          color="primary"
          variant="outlined"
          size="small"
        >
          New Entry
        </Button>
      </Toolbar>
    </div>
  )
}
