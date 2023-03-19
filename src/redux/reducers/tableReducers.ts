export interface TableData {
  "companySigDate": string,
  "companySignatureName": string,
  "documentName": string,
  "documentStatus": string,
  "documentType": string,
  "employeeNumber": string,
  "employeeSigDate": string,
  "employeeSignatureName": string,
  "id": string,
}

export interface TableState {
  isLoading?: boolean,
  error?: boolean,
  data: TableData[],
}

export interface TableAction {
  type: string,
  payload?: TableData[],
}

export const tableReducer = (state: TableState = { data: [] }, action: TableAction) => {
  switch (action.type) {
    case "START_GET_TABLE": {
      return {
        ...state,
        isLoading: true,
      }
    }
    case "GET_TABLE_SUCCESS": {
      return {
        ...state,
        error: false,
        isLoading: false,
        data: action.payload,
      }
    }
    case "ADD_TABLE_SUCCESS": {
      return {
        ...state,
        error: false,
        isLoading: false,
        data: action.payload?.concat(...state.data)
      }
    }
    case "DELETE_TABLE_SUCCESS": {
      state.data = state.data.filter((item) => {
        return item.id !== (action.payload && action.payload[0].id)
      })
      return {
        ...state,
        error: false,
        isLoading: false,
      }
    }
    case "GET_TABLE_FAILURE": {
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    }
    default:
      return state
  }
}