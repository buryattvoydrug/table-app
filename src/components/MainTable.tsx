import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Stack, Snackbar, Alert } from '@mui/material'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { addRowToTable, deleteRowFromTable, getTable } from '../redux/actions/tableActions';
import { AuthState } from '../redux/reducers/authReducers';
import { TableAction, TableData, TableState } from '../redux/reducers/tableReducers';
import { RootState } from '../redux/store';
import NewRow from './NewRow';
import Row from './Row';

export default function MainTable() {
  const userLogin = useSelector<RootState, AuthState>(
    (state: RootState) => state.userLogin
  )
  const { loginInfo } = userLogin

  const tableData = useSelector<RootState, TableState>(
    (state: RootState) => state.tableData
  )
  const { data } = tableData

  const dispatch = useDispatch<ThunkDispatch<TableState, unknown, TableAction>>()

  useEffect(() => {
    if (loginInfo.authToken) {
      dispatch(getTable(loginInfo.authToken))
    }
    
  }, [loginInfo, dispatch])

  return (
    <>
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Дата регистрации компании</TableCell>
            <TableCell>Название подписи компании</TableCell>
            <TableCell>Название документа</TableCell>
            <TableCell>Статус документа</TableCell>
            <TableCell>Тип документа</TableCell>
            <TableCell>Номер сотрудника</TableCell>
            <TableCell>Дата регистрации сотрудника</TableCell>
            <TableCell>Имя подписи сотрудника</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <Row key={item.id} data={item}/>
          ))}

          <NewRow/>

        </TableBody>
      </Table>
    </TableContainer>

    </>
  )
}
