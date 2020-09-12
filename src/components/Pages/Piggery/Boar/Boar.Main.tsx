import React, { Fragment, Suspense, useState } from 'react'

import BoarFormDialog from './Boar.FormDialog'
import BoarTable from './Boar.Table'
import Button from '@material-ui/core/Button'
import LoaderData from '../../Loader/Loader.Data'
import PiggeryStyles from '../Piggery.Styles'
import Toolbar from '@material-ui/core/Toolbar'
import { TransactionStatus } from '../Forms/Forms.Interfaces'
import { createResource } from '../Piggery.Utils'

const resource = createResource('boars')

export default () => {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<TransactionStatus>(null)

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const classes = PiggeryStyles()

  return (
    <Fragment>
      <BoarFormDialog
        open={open}
        onClose={handleClose}
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
        <BoarTable status={status} resource={resource} />
      </Suspense>
    </Fragment>
  )
}
