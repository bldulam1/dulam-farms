import React, { Fragment, useState } from 'react'

import { FetchResult } from '../Forms/Forms.util'
import LinearProgress from '@material-ui/core/LinearProgress'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { defaultSearchOptions } from '../Piggery.Utils'
import { timeElapsed } from '../../../utils/date'

export default (params: { resource: { read: () => any } }) => {
  const [rows, setRows] = useState<FetchResult>(params.resource.read())
  const [reloadState, setReloadState] = useState<'in progress' | 'success'>(
    'success'
  )
  const [options, setOptions] = useState(defaultSearchOptions)

  const handlePageChange = (event: unknown, newPage: number) => {
    setOptions((op) => ({ ...op, page: newPage }))
  }

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setOptions((op) => ({ ...op, limit: Number(event.target.value) }))

  console.log(rows)
  // hogId: "asdf"
  // birthDate: "2020-07-30T00:00:00.000Z"
  // sex: "Female"
  // nipplesCount: "12"
  // fatherPigID: "asdflkj"
  // motherPigID: "asdflk"
  // recordDate: "2020-08-29T21:31:17.230Z"

  return (
    <Fragment>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Birth Date</TableCell>
              <TableCell align="center">Sex</TableCell>
              <TableCell align="center"> Nipples</TableCell>
              <TableCell align="center">Father</TableCell>
              <TableCell align="center">Mother</TableCell>
              <TableCell align="center">Date Recorded</TableCell>
              <TableCell align="center">Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.subset.map((row: { [key: string]: any }) => (
              <TableRow key={row._id}>
                <TableCell align="center">{row.hogId}</TableCell>
                <TableCell align="center">
                  {new Date(row.birthDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{row.sex}</TableCell>
                <TableCell align="center">{row.nipplesCount}</TableCell>
                <TableCell align="center">{row.fatherPigID}</TableCell>
                <TableCell align="center">{row.motherPigID}</TableCell>
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
      <LinearProgress hidden={reloadState === 'success'} />
      <TablePagination
        rowsPerPage={options.limit}
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        page={options.page}
        count={rows.total}
        onChangePage={handlePageChange}
        labelRowsPerPage="Rows"
        onChangeRowsPerPage={handleRowsPerPageChange}
      />
    </Fragment>
  )
}
