import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { getTable } from '../redux/actions/tableActions';
import ReplayIcon from '@mui/icons-material/Replay';
import { AuthState } from '../redux/reducers/authReducers';
import { TableAction, TableData, TableState } from '../redux/reducers/tableReducers';
import { RootState } from '../redux/store';
import Row from './Row';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid'

export default function MainTable() {

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

  const userLogin = useSelector<RootState, AuthState>(
    (state: RootState) => state.userLogin
  )
  const { loginInfo } = userLogin

  const tableData = useSelector<RootState, TableState>(
    (state: RootState) => state.tableData
  )
  const { data } = tableData

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
      color="primary" 
      variant='outlined'
      endIcon={<ReplayIcon />}
      onClick={() => setReloadTable(prev => !prev)}
    >
      Обновить данные
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
          {data.map((item) => (
            <Row key={item.id} data={item}/>
          ))}

          <Row newRow data={INITIAL_ROW_STATE}/>

        </TableBody>
      </Table>
    </TableContainer>
    
    </>
  )
}
