import React, { Fragment, Suspense, useState } from 'react'

import Button from '@material-ui/core/Button'
import HogFormDialog from './Hog.FormDialog'
import HogTable from './Hog.Table'
import LoaderData from '../../Loader/Loader.Data'
import PiggeryStyles from '../Piggery.Styles'
import Toolbar from '@material-ui/core/Toolbar'
import { TransactionStatus } from '../Forms/Forms.Interfaces'
import { createResource } from '../Piggery.Utils'

const resource = createResource('hogs')

export default () => {
  const classes = PiggeryStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [status, setStatus] = useState<TransactionStatus>(null)

  const handleClose = () => setDialogOpen(false)
  const handleOpen = () => setDialogOpen(true)

  return (
    <Fragment>
      <HogFormDialog
        dialogProps={{ open: dialogOpen, onClose: handleClose }}
        status={status}
        setStatus={setStatus}
      />
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
        <HogTable status={status} resource={resource} />
      </Suspense>
    </Fragment>
  )
}
