import { FetchResult, fetchData } from '../Forms/Forms.util'
import React, { useEffect, useState } from 'react'
import { TransactionStatus, boarHeaders } from '../Forms/Forms.Interfaces'

import LinearProgress from '@material-ui/core/LinearProgress'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { defaultSearchOptions } from './Boar.utils'
import { timeElapsed } from '../../../utils/date'

export default (params: {
  status: TransactionStatus
  resource: { boars: { read: () => any } }
}) => {
  const result = params.resource.boars.read()
  const [rows, setRows] = useState<FetchResult>(result)
  const [options, setOptions] = useState(defaultSearchOptions)
  const [reloadState, setReloadState] = useState<'in progress' | 'success'>(
    'success'
  )

  useEffect(() => {
    let isLoaded = true
    if (params.status === 'success' || options) {
      const url = `/.netlify/functions/data?collection=boars&options=${JSON.stringify(
        options
      )}`
      setReloadState('in progress')

      fetchData(url).then(
        (res) => {
          if (isLoaded) {
            setRows(res)
            setReloadState('success')
          }
        },
        (err) => alert(err)
      )

      return () => {
        isLoaded = false
      }
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
              <TableCell align="center">Age</TableCell>
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
    </React.Fragment>
  )
}
