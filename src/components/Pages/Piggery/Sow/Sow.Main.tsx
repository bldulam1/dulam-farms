import React, { Fragment, Suspense, useState } from 'react'

import Button from '@material-ui/core/Button'
import LoaderData from '../../Loader/Loader.Data'
import PiggeryStyles from '../Piggery.Styles'
import SowFormDialog from './Sow.FormDialog'
import SowTable from './Sow.Table'
import Toolbar from '@material-ui/core/Toolbar'
import { TransactionStatus } from '../Forms/Forms.Interfaces'
import { createResource } from '../Piggery.Utils'

const resource = createResource('sows')

export default () => {
  const classes = PiggeryStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [status, setStatus] = useState<TransactionStatus>(null)

  const handleClose = () => setDialogOpen(false)
  const handleOpen = () => setDialogOpen(true)
  return (
    <Fragment>
      <SowFormDialog
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
        <SowTable status={status} resource={resource} />
      </Suspense>
    </Fragment>
  )
}
