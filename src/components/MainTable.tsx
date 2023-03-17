import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getTable } from '../redux/actions/tableActions';
import { AuthState } from '../redux/reducers/authReducers';
import { DateISO, TableAction, TableState } from '../redux/reducers/tableReducers';
import { RootState } from '../redux/store';

export default function MainTable() {
  const userLogin = useSelector<RootState, AuthState>(
    (state: RootState) => state.userLogin
  )
  const tableData = useSelector<RootState, TableState>(
    (state: RootState) => state.tableData
  )
  const { loginInfo } = userLogin
  const { data } = tableData

  const dispatch = useDispatch<ThunkDispatch<TableState, unknown, TableAction>>()
  useEffect(() => {
    if (loginInfo.authToken) {
      dispatch(getTable(loginInfo.authToken))
    }
  }, [loginInfo, dispatch])

  const localDateFromISO = (stringISO: DateISO): string => {
    const date = new Date(stringISO)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  return (
    <>
    {!!data.length &&
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
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{localDateFromISO(item.companySigDate)}</TableCell>
              <TableCell>{item.companySignatureName}</TableCell>
              <TableCell>{item.documentName}</TableCell>
              <TableCell>{item.documentStatus}</TableCell>
              <TableCell>{item.documentType}</TableCell>
              <TableCell>{item.employeeNumber}</TableCell>
              <TableCell>{localDateFromISO(item.employeeSigDate)}</TableCell>
              <TableCell>{item.employeeSignatureName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </>
  )
}
