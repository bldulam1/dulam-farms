import { FetchResult, fetchData } from '../Forms/Forms.util'
import React, { Fragment, useEffect, useState } from 'react'
import { defaultSearchOptions, getResourceURL } from '../Piggery.Utils'

import LinearProgress from '@material-ui/core/LinearProgress'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { TransactionStatus } from '../Forms/Forms.Interfaces'
import { timeElapsed } from '../../../utils/date'

export default (params: {
  status: TransactionStatus
  resource: { read: () => any }
}) => {
  const [rows, setRows] = useState<FetchResult>(params.resource.read())
  const [isInintialLoad, setIsInitialLoad] = useState(true)
  const [reloadState, setReloadState] = useState<'in progress' | 'success'>(
    'success'
  )
  const [options, setOptions] = useState(defaultSearchOptions)

  const isTriggerReload = params.status === 'success'
  useEffect(() => {
    let isLoaded = true
    if (!isInintialLoad || isTriggerReload) {
      setReloadState('in progress')

      const url = getResourceURL('hogs', options)
      fetchData(url).then(
        (res) => {
          if (isLoaded) {
            setRows(res)
            setReloadState('success')
          }
        },
        (err) => alert(err)
      )
    }

    return () => {
      if (isInintialLoad) {
        setIsInitialLoad(false)
      }
      isLoaded = false
    }
  }, [options, isInintialLoad, isTriggerReload])

  const handlePageChange = (event: unknown, newPage: number) => {
    setOptions((op) => ({ ...op, page: newPage }))
  }

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setOptions((op) => ({ ...op, limit: Number(event.target.value) }))

  return (
    <Fragment>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Hog ID</TableCell>
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
