import {
  IBoarEntry,
  TransactionStatus,
  boarHeaders,
} from '../Forms/Forms.Interfaces'

import BoarFormDialog from './Boar.FormDialog'
import Button from '@material-ui/core/Button'
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Toolbar from '@material-ui/core/Toolbar'
import { fetchData } from '../Forms/Forms.util'

export default () => {
  const [rows, setRows] = React.useState<IBoarEntry[]>([])
  const [open, setOpen] = React.useState(false)
  const [status, setStatus] = React.useState<TransactionStatus>(null)

  React.useEffect(() => {
    if (status === 'success' || !status) {
      const query = JSON.stringify({
        a: 'asdf',
      })
      const url = `/.netlify/functions/data?collection=boars&query=${query}`
      fetchData(url, setRows)
    }
  }, [status])

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  return (
    <div>
      <BoarFormDialog
        open={open}
        onClose={handleClose}
        status={status}
        setStatus={setStatus}
      />
      <Toolbar>
        <Button onClick={handleOpen} color="primary">
          New Entry
        </Button>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(boarHeaders).map((header, index) => (
              <TableCell key={`header-id-${index}-${header}`} align="center">
                {boarHeaders[header].headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: { [key: string]: any }) => (
            <TableRow key={row._id}>
              {Object.keys(boarHeaders).map((header, index) => (
                <TableCell key={`body-id-${index}-${row._id}`} align="center">
                  {boarHeaders[header].bodyDisplay(row[header])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
