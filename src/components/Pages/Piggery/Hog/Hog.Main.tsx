import React, { Suspense, useState } from 'react'

import Button from '@material-ui/core/Button'
import HogFormDialog from './Hog.FormDialog'
import HogTable from './Hog.Table'
import LoaderData from '../../Loader/Loader.Data'
import PiggeryStyles from '../Piggery.Styles'
import Toolbar from '@material-ui/core/Toolbar'
import { createResource } from '../Piggery.Utils'

const resource = createResource('hogs')

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
      <Suspense fallback={<LoaderData />}>
        <HogTable resource={resource} />
      </Suspense>
    </div>
  )
}
