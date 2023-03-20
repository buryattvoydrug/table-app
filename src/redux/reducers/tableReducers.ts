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
  error?: string,
  data: TableData[],
}

export interface TableAction {
  type: string,
  payload: {
    data?: TableData[],
    error?: string,
  },
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
        error: action.payload.error,
        isLoading: false,
        data: action.payload.data,
      }
    }
    case "ADD_TABLE_SUCCESS": {
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
        data: state.data.concat(action.payload.data || [])
      }
    }
    case "DELETE_TABLE_SUCCESS": {
      state.data = state.data.filter((item) => {
        return item.id !== (action.payload.data && action.payload.data[0].id)
      })
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      }
    }
    case "UPDATE_TABLE_SUCCESS": {
      state.data = state.data.map((item) => {
        if (action.payload.data && item.id === action.payload.data[0].id) {
          return action.payload.data[0]
        } else return item
      })
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      }
    }
    case "TABLE_FAILURE": {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      }
    }
    default:
      return state
  }
}