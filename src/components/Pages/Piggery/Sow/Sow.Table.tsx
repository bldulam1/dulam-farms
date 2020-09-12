import React, { Fragment, useState } from 'react'

import { FetchResult } from '../Forms/Forms.util'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { TransactionStatus } from '../Forms/Forms.Interfaces'
import { timeElapsed } from '../../../utils/date'

export default (params: {
  status: TransactionStatus
  resource: { read: () => FetchResult | (() => FetchResult) }
}) => {
  const [rows, setRows] = useState<FetchResult>(params.resource.read())
  console.log(rows)

  return (
    <Fragment>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Sow ID</TableCell>
              <TableCell align="center">Birth Date</TableCell>
              <TableCell align="center">Nipples</TableCell>
              <TableCell align="center">Breed</TableCell>
              <TableCell align="center">Date Recorded</TableCell>
              <TableCell align="center">Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.subset.map((row: { [key: string]: any }) => (
              <TableRow key={row._id}>
                <TableCell align="center">{row.sowID}</TableCell>
                <TableCell align="center">
                  {new Date(row.birthDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{row.nipplesCount}</TableCell>
                <TableCell align="center">{row.breed}</TableCell>
                <TableCell align="center">
                  {new Date(row.recordDate).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  {timeElapsed(row.birthDate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  )
}
