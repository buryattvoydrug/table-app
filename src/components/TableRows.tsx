import dayjs from 'dayjs'
import { TableData } from '../redux/reducers/tableReducers'
import Row from './Row'
import { v4 as uuid } from 'uuid'

export default function TableRows({data}: {data: TableData[]}) {
  
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

  return (
    <>
    {data.map((item) => (
      <Row key={item.id} data={item}/>
    ))}

    <Row newRow data={INITIAL_ROW_STATE}/>
    </>
  )
}

