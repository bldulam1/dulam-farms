import React, { useEffect, useState } from 'react'
import { TransactionStatus, boarHeaders } from '../Forms/Forms.Interfaces'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { fetchData } from '../Forms/Forms.util'

export default (params: {
  status: TransactionStatus
  resource: { boars: { read: () => any } }
}) => {
  const [rows, setRows] = useState(params.resource.boars.read())
  const [options, setOptions] = useState({
    sort: {},
    page: 0,
    limit: 5,
  })

  useEffect(() => {
    if (params.status === 'success') {
      fetchData(
        `/.netlify/functions/data?collection=boars&options=${options}`
      ).then(
        (res) => setRows(res),
        (err) => alert(err)
      )
    }
  }, [params.status])

  return (
    <Table size="small">
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
  )
}
