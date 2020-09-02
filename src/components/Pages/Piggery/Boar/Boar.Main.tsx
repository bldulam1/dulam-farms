import React, { Suspense, useState } from 'react'

import BoarFormDialog from './Boar.FormDialog'
import BoarStyles from './Boar.Styles'
import BoarTable from './Boar.Table'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Toolbar from '@material-ui/core/Toolbar'
import { TransactionStatus } from '../Forms/Forms.Interfaces'
import { createResource } from './Boar.utils'

const resource = createResource()

export default () => {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<TransactionStatus>(null)

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const classes = BoarStyles()

  return (
    <div>
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
      <Suspense
        fallback={
          <div
            style={{
              width: '100vw',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={100} />
          </div>
        }
      >
        <BoarTable status={status} resource={resource} />
      </Suspense>
    </div>
  )
}
