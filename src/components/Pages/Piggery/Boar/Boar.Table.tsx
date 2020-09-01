import { FetchResult, fetchData } from '../Forms/Forms.util'
import React, { useEffect, useState } from 'react'
import { TransactionStatus, boarHeaders } from '../Forms/Forms.Interfaces'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { defaultSearchOptions } from './Boar.utils'

export default (params: {
  status: TransactionStatus
  resource: { boars: { read: () => any } }
}) => {
  const [rows, setRows] = useState<FetchResult>(params.resource.boars.read())
  const [options, setOptions] = useState(defaultSearchOptions)

  useEffect(() => {
    if (params.status === 'success' || options) {
      const url = `/.netlify/functions/data?collection=boars&options=${JSON.stringify(
        options
      )}`
      fetchData(url).then(
        (res) => setRows(res),
        (err) => alert(err)
      )
    }
  }, [params.status, options])

  const handlePageChange = (event: unknown, newPage: number) => {
    setOptions((op) => ({ ...op, page: newPage }))
  }

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setOptions((op) => ({ ...op, limit: Number(event.target.value) }))

  return (
    <React.Fragment>
      <TableContainer>
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
            {rows.subset.map((row: { [key: string]: any }) => (
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
      </TableContainer>
      <TablePagination
        rowsPerPage={options.limit}
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        page={options.page}
        count={rows.total}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleRowsPerPageChange}
      />
    </React.Fragment>
  )
}
