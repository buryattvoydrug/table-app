import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Button, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { getTable } from '../redux/actions/tableActions';
import ReplayIcon from '@mui/icons-material/Replay';
import { AuthState } from '../redux/reducers/authReducers';
import { TableAction, TableState } from '../redux/reducers/tableReducers';
import { RootState } from '../redux/store';

import ErrorAlert from './ErrorAlert';
import TableRows from './TableRows';

export default function MainTable() {

  const userLogin = useSelector<RootState, AuthState>(
    (state: RootState) => state.userLogin
  )
  const tableData = useSelector<RootState, TableState>(
    (state: RootState) => state.tableData
  )
  const { loginInfo } = userLogin
  const { data, isLoading } = tableData

  const dispatch = useDispatch<ThunkDispatch<TableState, unknown, TableAction>>()
  const [reloadTable, setReloadTable] = useState(false)

  useEffect(() => {
    if (loginInfo.authToken) {
      dispatch(getTable(loginInfo.authToken))
    }
  }, [reloadTable, loginInfo, dispatch])

  return (
    <>
    <Button 
      disabled={isLoading}
      color="primary" 
      variant="outlined"
      sx={{ height: "30px" }}
      onClick={() => setReloadTable(prev => !prev)}
    >
      <ReplayIcon />
    </Button>
    <TableContainer>
      <Table sx={{ minWidth: 650, marginBottom: 25 }} aria-label="simple table">
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
          <TableRows data={data}/>
        </TableBody>
      </Table>
    </TableContainer>
    <ErrorAlert />
    </>
  )
}
