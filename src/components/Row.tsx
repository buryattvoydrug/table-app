import { Button, Stack, TableCell, TableRow, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { deleteRowFromTable, updateRowTable } from '../redux/actions/tableActions'
import { AuthState } from '../redux/reducers/authReducers'
import { TableAction, TableData, TableState } from '../redux/reducers/tableReducers'
import { RootState } from '../redux/store'
import DeleteIcon from '@mui/icons-material/Delete';
import SyncIcon from '@mui/icons-material/Sync';
import { useEffect, useState } from 'react'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React from 'react'
import dayjs, { Dayjs } from 'dayjs'

export default function Row({data}: {data: TableData}) {

  const userLogin = useSelector<RootState, AuthState>(
    (state: RootState) => state.userLogin
  )
  const { loginInfo } = userLogin
  const dispatch = useDispatch<ThunkDispatch<TableState, unknown, TableAction>>()

  const [rowObj, setRowObj] = useState<TableData>(data)
  const [companySigDate, setCompanySigDate] = React.useState<Dayjs>(dayjs(data.companySigDate));
  const [employeeSigDate, setEmployeeSigDate] = React.useState<Dayjs>(dayjs(data.employeeSigDate));
  
  useEffect(() => {
    if (companySigDate?.isValid()) {
      setRowObj((prev) => {
        return {
          ...prev,
          companySigDate: companySigDate?.toISOString(),
        }
      })
    }
    if (employeeSigDate?.isValid()) {
      setRowObj((prev) => {
        return {
          ...prev,
          employeeSigDate: employeeSigDate?.toISOString(),
        }
      })
    }
  }, [companySigDate, employeeSigDate])

  const handleDeleteRow = () => {
    console.log(rowObj)
    if (rowObj && loginInfo.authToken) {
      dispatch(deleteRowFromTable(rowObj, loginInfo.authToken))
    }
  }

  const handleUpdateRow = () => {
    console.log(rowObj)
    if (rowObj && loginInfo.authToken) {
      dispatch(updateRowTable(rowObj, loginInfo.authToken))
    }
  }

  return (
    <>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell sx={{padding: "10px 5px 10px 0"}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              format='DD.MM.YYYY HH:mm:ss'
              sx={{width: 220}}
              value={companySigDate}
              ampm={false}
              onChange={(newValue) => newValue && setCompanySigDate(newValue)}
            />
          </LocalizationProvider>
        </TableCell>
        <TableCell sx={{padding: "10px 5px 10px 0"}}>
          <TextField
            value={rowObj.companySignatureName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRowObj((prev) => {
                return {
                  ...prev, 
                  companySignatureName: event.target.value,
                }
              })
            }}
          />
        </TableCell>
        <TableCell sx={{padding: "10px 5px 10px 0"}}>
          <TextField
            value={rowObj.documentName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRowObj((prev) => {
                return {
                  ...prev, 
                  documentName: event.target.value,
                }
              })
            }}
          />
        </TableCell>
        <TableCell sx={{padding: "10px 5px 10px 0"}}>
          <TextField
            value={rowObj.documentStatus}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRowObj((prev) => {
                return {
                  ...prev, 
                  documentStatus: event.target.value,
                }
              })
            }}
          />
        </TableCell>
        <TableCell sx={{padding: "10px 5px 10px 0"}}>
          <TextField
            value={rowObj.documentType}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRowObj((prev) => {
                return {
                  ...prev, 
                  documentType: event.target.value,
                }
              })
            }}
          />
        </TableCell>
        <TableCell sx={{padding: "10px 5px 10px 0"}}>
          <TextField
            value={rowObj.employeeNumber}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRowObj((prev) => {
                return {
                  ...prev, 
                  employeeNumber: event.target.value,
                }
              })
            }}
          />
        </TableCell>
        <TableCell sx={{padding: "10px 5px 10px 0"}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              format='DD.MM.YYYY HH:mm:ss'
              sx={{width: 220}}
              value={employeeSigDate}
              ampm={false}
              onChange={(newValue) => newValue && setEmployeeSigDate(newValue)}
            />
          </LocalizationProvider>
        </TableCell>
        <TableCell sx={{padding: "10px 5px 10px 0"}}>
          <TextField
            value={rowObj.employeeSignatureName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRowObj((prev) => {
                return {
                  ...prev, 
                  employeeSignatureName: event.target.value,
                }
              })
            }}
          />
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={1}>
            <Button 
              variant="outlined"
              color="primary" 
              onClick={handleUpdateRow}
            >
              <SyncIcon/>
            </Button>
            <Button 
              variant="outlined"
              color="warning" 
              onClick={handleDeleteRow}
            >
              <DeleteIcon/>
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  )
}
