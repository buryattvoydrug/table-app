import { Box, Button, Fab, Stack, Table, TableCell, TableContainer, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { addRowToTable, getTable } from '../redux/actions/tableActions'
import { AuthState } from '../redux/reducers/authReducers'
import { TableAction, TableData, TableState } from '../redux/reducers/tableReducers'
import { RootState } from '../redux/store'
import CheckIcon from '@mui/icons-material/Check';
import { v4 as uuid } from 'uuid'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs'

const INITIAL_ROW_STATE: TableData = {
  id: uuid(),
  companySigDate: dayjs(Date.now()).toISOString(), 
  companySignatureName: "",
  documentName: "",
  documentStatus: "",
  documentType: "",
  employeeNumber: "",
  employeeSigDate: dayjs(Date.now()).toISOString(), 
  employeeSignatureName: ""
}

export default function NewRow() {
  const userLogin = useSelector<RootState, AuthState>(
    (state: RootState) => state.userLogin
  )
  const { loginInfo } = userLogin
  const dispatch = useDispatch<ThunkDispatch<TableState, unknown, TableAction>>()

  const [companySigDate, setCompanySigDate] = React.useState<Dayjs>(dayjs(INITIAL_ROW_STATE.companySigDate));
  const [employeeSigDate, setEmployeeSigDate] = React.useState<Dayjs>(dayjs(INITIAL_ROW_STATE.employeeSigDate));
  const [rowObj, setRowObj] = useState<TableData>(INITIAL_ROW_STATE)

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

  const handleAddRow = () => {
    console.log(rowObj)
    if (rowObj && loginInfo.authToken) {
      dispatch(addRowToTable(rowObj, loginInfo.authToken))
      setRowObj(INITIAL_ROW_STATE)
    }
  }

  return (
    <>
    <TableRow>
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
          value={rowObj?.companySignatureName}
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
          required
          value={rowObj?.documentName}
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
          required
          value={rowObj?.documentStatus}
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
          value={rowObj?.documentType}
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
          value={rowObj?.employeeNumber}
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
          value={rowObj?.employeeSignatureName}
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
            onClick={handleAddRow}
          >
            <CheckIcon />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
    </>
  )
}
